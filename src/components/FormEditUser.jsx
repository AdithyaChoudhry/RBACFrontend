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
    margin-bottom: 30px; /* Increased margin to avoid overlap */
    font-weight: 500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Card = styled.div`
    background: rgba(100, 149, 237, 0.2);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 30px; /* Increased padding for better spacing */
    margin: 0 auto;
    width: 300px;
    position: absolute;
    left: 20px;
    top: 60%;
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

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-size: 1em;
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

const FormEditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`);
                setName(response.data.name);
                setEmail(response.data.email);
                setRole(response.data.role);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role,
            });
            navigate("/users");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <Container>
            <Title>Users</Title>
            <Subtitle>Update User</Subtitle>
            <Card>
                <form onSubmit={updateUser}>
                    <p className="has-text-centered">{msg}</p>
                    <div className="field">
                        <label className="label">Name</label>
                        <InputContainer>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </InputContainer>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <InputContainer>
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </InputContainer>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <InputContainer>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="******"
                            />
                        </InputContainer>
                    </div>
                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <InputContainer>
                            <Input
                                type="password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}
                                placeholder="******"
                            />
                        </InputContainer>
                    </div>
                    <div className="field">
                        <label className="label">Role</label>
                        <InputContainer>
                            <Select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User </option>
                            </Select>
                        </InputContainer>
                    </div>
                    <div className="field">
                        <div className="control">
                            <Button type="submit">Update</Button>
                        </div>
                    </div>
                </form>
            </Card>
        </Container>
    );
};

export default FormEditUser;