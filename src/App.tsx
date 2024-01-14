import React from "react";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <div>
      <Welcome />
      <Login />
      <Register />
    </div>
  );
};

export default App;
