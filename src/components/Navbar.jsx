import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../control.png";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import styled from "styled-components";

const NavbarContainer = styled.nav`
    background: linear-gradient(135deg, rgba(25, 25, 112, 0.8), rgba(30, 144, 255, 0.8));
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 900;
    height: 60px;
    transition: background-color 0.3s ease;
    border-radius: 0 0 10px 10px;

    &:hover {
        background: linear-gradient(135deg, rgba(30, 144, 255, 0.8), rgba(25, 25, 112, 0.8));
    }
`;

const NavbarBrand = styled.div`
    display: flex;
    align-items: center;
`;


const Logo = styled.img`
    width: 40px;
    height: 37px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const LogoutButton = styled.button`
    background-color: #dc3545;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #5ab0e4;
        transform: scale(1.05);
    }
`;

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    return (
        <NavbarContainer role="navigation" aria-label="main navigation">
            <NavbarBrand>
                <NavLink to="/dashboard" className="navbar-item">
                    <Logo src={logo} alt="logo" />
                </NavLink>

                <a
                    href="!#"
                    role="button"
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <LogoutButton onClick={logout}>
                                    Logout
                                </LogoutButton>
                            </div>
                        </div>
                    </div>
                </div>
            </NavbarBrand>
        </NavbarContainer>
    );
};

export default Navbar;