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
import { Global, css } from "@emotion/react";
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
      <Global
        styles={css`
          /* Modal backdrop styles */
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 999;
          }

          /* Modern scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 4px;
            border: none;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
          }

          /* Selection styling */
          ::selection {
            background: rgba(99, 102, 241, 0.3);
            color: inherit;
          }

          ::-moz-selection {
            background: rgba(99, 102, 241, 0.3);
            color: inherit;
          }
        `}
      />
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
                        <Suspense
                          fallback={<LoadingBars bars={suspenseBars} />}
                        >
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
