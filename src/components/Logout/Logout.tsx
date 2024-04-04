import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Button
      onClick={handleLogout}
      width={"large"}
      height={"medium"}
      borderRadius={"xsmall"}
      padding={"xsmall"}
      backgroundColor={"primary"}
    >
      Logout
    </Button>
  );
};

export default Logout;
