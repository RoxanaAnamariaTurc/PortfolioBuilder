import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { logoutUser } from "../../../api";
import { UserContext, UserContextProps } from "../../../UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { clearSession } = useContext(UserContext) as UserContextProps;

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error logging out", error);
    } finally {
      clearSession();
      navigate("/login");
    }
  };
  return (
    <Button
      onClick={handleLogout}
      width={"large"}
      height={"medium"}
      borderRadius={"xsmall"}
      padding={"xsmall"}
      backgroundColor={"transparent"}
      color={"primary"}
    >
      Logout
    </Button>
  );
};

export default Logout;
