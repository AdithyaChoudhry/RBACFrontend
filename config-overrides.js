const { overrideDevServer } = require('customize-cra');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = overrideDevServer(
    config => {
        config.setupMiddlewares = (middlewares, devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            middlewares.push(
                createProxyMiddleware('/api', {
                    target: 'http://localhost:5000',
                    changeOrigin: true,
                })
            );

            return middlewares;
        };

        return config;
    }
);