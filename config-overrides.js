const { overrideDevServer } = require('customize-cra');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = overrideDevServer((config) => {
    config.devServer = {
        ...config.devServer,
        setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            const apiProxy = createProxyMiddleware('/api', {
                target: 'http://localhost:5000',
                changeOrigin: true,
            });

            middlewares.push(apiProxy);

            return middlewares;
        },
    };

    return config;
});