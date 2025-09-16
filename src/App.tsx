import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./frontend/components/Welcome/Welcome";
import Login from "./frontend/components/Login/Login";
import Register from "./frontend/components/Register/Register";
import UserDashboard from "./frontend/components/UserDashboard/UserDashboard";
import Portfolio from "./frontend/components/Portfolio/Portfolio";
import LoadingBars from "./frontend/components/LoadingBars/LoadingBars";
import { ThemeStateProvider } from "./frontend/components/ThemeContext";
import { UserProvider } from "./UserContext";
import { theme } from "./theme";
import "typeface-roboto";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

const suspenseBars = [
  { width: "300px", delay: "0s" },
  { width: "200px", delay: "0.2s" },
  { width: "300px", delay: "0.4s" },
];

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LoadingBars bars={suspenseBars} />}>
            <UserProvider>
              <ThemeStateProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/userdashboard"
                      element={
                        <Suspense fallback={<LoadingBars type="circle" />}>
                          <UserDashboard />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/portfolio/:token"
                      element={
                        <Suspense fallback={<LoadingBars bars={suspenseBars} />}>
                          <Portfolio />
                        </Suspense>
                      }
                    />
                  </Routes>
                </Router>
              </ThemeStateProvider>
            </UserProvider>
          </Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
