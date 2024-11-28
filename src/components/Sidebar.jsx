import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import styled from "styled-components";
import { motion } from "framer-motion";

const SidebarContainer = styled(motion.aside)`
  background: linear-gradient(135deg, rgba(25, 25, 112, 0.8), rgba(30, 144, 255, 0.8));
  color: #fff;
  padding: 25px;
  height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 0 15px 15px 0;
  position: fixed;
  width: 220px;
  left: 0;
  transition: width 0.2s ease;
  z-index: 1000;

  &:hover {
    width: 230px;
  }
`;

const MenuLabel = styled.p`
  font-size: 1.2em;
  margin: 10px 0;
  font-weight: bold;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin: 10px 0;

  a, button {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const LogoutButton = styled.button`
  color: #fff;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MainContent = styled.div`
  margin-left: 250px;
  padding: 20px;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <SidebarContainer>
      <MenuLabel>General</MenuLabel>
      <MenuList>
        <MenuItem>
          <NavLink to={"/dashboard"}>
            <IoHome /> Dashboard
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={"/products"}>
            <IoPricetag /> Products
          </NavLink>
        </MenuItem>
      </MenuList>
      {user && user.role === "admin" && (
        <div>
          <MenuLabel>Admin</MenuLabel>
          <MenuList>
            <MenuItem>
              <NavLink to={"/users"}>
                <IoPerson /> Users
              </NavLink>
            </MenuItem>
          </MenuList>
        </div>
      )}
      <MenuLabel>Settings</MenuLabel>
      <MenuList>
        <MenuItem>
          <LogoutButton onClick={logout}>
            <IoLogOut /> Logout
          </LogoutButton>
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;