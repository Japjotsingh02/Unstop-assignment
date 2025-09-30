import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const LoginForm = lazy(() => import("./pages/auth/LoginForm"));
const Home = lazy(() => import("./pages/main/home"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  return (
    <div className="font-poppins min-h-screen min-w-screen text-[#1c1b1f]">
      <Router>
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
          <Routes>
            <Route
              path="/auth/login"
              element={
                isAuthenticated ? <Navigate to="/home" /> : <LoginForm onLogin={handleLogin} />
              }
            />

            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/auth/login" />}
            />

            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/home" : "/auth/login"} />}
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
