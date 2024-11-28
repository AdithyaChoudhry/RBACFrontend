import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    height: 100vh;
    position: relative;
    overflow: hidden;
    color: #343a40;
    background-color: rgba(100, 149, 237, 0.8);
    transition: background-color 1s ease;

    &:hover {
        background-color: rgba(30, 144, 255, 0.8);
    }
`;

const Title = styled.h1`
    color: #343a40;
    position: relative;
    z-index: 1;
`;

const Subtitle = styled.h2`
    color: #6c757d;
    position: relative;
    z-index: 1;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    position: relative;
    z-index: 1;

    th, td {
        padding: 15px;
        text-align: left;
        border: 1px solid #dee2e6;
        color: #343a40;
        border-radius: 8px;
    }

    th {
        background-color: #007bff;
        color: white;
        font-weight: bold;
        text-transform: uppercase;
    }

    tr:hover {
        background-color: rgba(0, 123, 255, 0.2);
        transition: background-color 0.3s;
    }
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    position: relative;
    z-index: 1;
    margin-right: 10px;
    font-size: 1em;
    min-width: 100px;

    &:hover {
        background-color: #0056b3;
    }

    &.is-danger {
        background-color: #dc3545;

        &:hover {
            background-color: #bd2130;
        }
    }
`;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
        setLoading(false);
    };

    const deleteProduct = async (productId) => {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        getProducts();
    };

    return (
        <Container>
            <Title>Products</Title>
            <Subtitle>List of Products</Subtitle>
            <Link to="/products/add">
                <Button className="mb-2">Add New</Button>
            </Link>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <StyledTable>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Created By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.uuid}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price.toFixed(2)}</td>
                                <td>{product.user.name}</td>
                                <td>
                                    <Link to={`/products/edit/${product.uuid}`}>
                                        <Button>Edit</Button>
                                    </Link>
                                    <Button onClick={() => deleteProduct(product.uuid)} className="is-danger">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            )}
        </Container>
    );
};

export default ProductList;