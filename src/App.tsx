import { ThemeProvider } from "@emotion/react";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { theme } from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { UserProvider } from "./UserContext";

const App: React.FC = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
            </Routes>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
