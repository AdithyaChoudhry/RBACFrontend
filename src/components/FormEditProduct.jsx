import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
    font-size: 2.5em;
    text-align: left;
    margin-bottom: 10px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.h2`
    color: #6c757d;
    font-size: 1.5em;
    text-align: left;
    margin-bottom: 30px;
    font-weight: 500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Card = styled.div`
    background: rgba(100, 149, 237, 0.2);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 0 auto;
    width: 300px;
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
`;

const InputContainer = styled.div`
    background-color: rgba(100, 149, 237, 0.3);
    border-radius: 4px;
    padding: 5px;
    margin-bottom: 15px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 1em;

    &:focus {
        outline: none;
        background-color: rgba(100, 149, 237, 0.4);
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
    font-size: 1em;
    width: 100%;

    &:hover {
        background-color: #0056b3;
    }
`;

const FormEditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(
                    `https://rbacbackend-production.up.railway.app/${id}`
                );
                setName(response.data.name);
                setPrice(response.data.price);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getProductById();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`https://rbacbackend-production.up.railway.app/products/${id}`, {
                name: name,
                price: price,
            });
            navigate("/products");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <Container>
            <Title>Products</Title>
            <Subtitle>Edit Product</Subtitle>
            <Card>
                <form onSubmit={updateProduct}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="field">
                        <label className="label">Name</label>
                        <InputContainer>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Product Name"
                            />
                        </InputContainer>
                    </div>
                    <div className="field">
                    <label className="label">Price</label>
                    <InputContainer>
                        <Input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                        />
                    </InputContainer>
                </div>
                <div className="field">
                    <div className="control">
                        <Button type="submit">Update</Button>
                    </div>
                </div>
            </form>
        </Card>
        </Container >
    );
};

export default FormEditProduct;