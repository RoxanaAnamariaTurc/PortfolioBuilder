import { ThemeProvider } from "@emotion/react";
import Welcome from "./frontend/components/Welcome/Welcome";
import Login from "./frontend/components/Login/Login";
import Register from "./frontend/components/Register/Register";
import { theme } from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./frontend/components/UserDashboard/UserDashboard";
import { UserProvider } from "./UserContext";
import "typeface-roboto";
import Portfolio from "./frontend/components/Portfolio/Portfolio";
import { ThemeStateProvider } from "./frontend/components/ThemeContext";

const App: React.FC = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <ThemeStateProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/portfolio/:userId" element={<Portfolio />} />
              </Routes>
            </Router>
          </ThemeStateProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
