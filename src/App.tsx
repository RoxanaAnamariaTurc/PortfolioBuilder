import { ThemeProvider } from "@emotion/react";
import Welcome from "./components/Welcome/Welcome";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { theme } from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { UserContext, User, UserContextProps } from "./UserContext";
import { useState } from "react";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const value: UserContextProps = { user, setUser };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={value}>
          <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export default App;
