import { useState, createContext } from "react";
import TheHeader from "./components/TheHeader";
import TheForm from "./components/TheForm";
import AppList from "./pages/AppList";
import AppLogin from "./pages/AppLogin";
import AppDashboard from "./pages/AppDashboard";
import PrivateRoute from "./middleware/AppPrivateRoutes";
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import AppSinglePost from "./pages/AppSinglePost";
export const GlobalContext = createContext();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TheHeader />
        <Routes>
          <Route>
            <Route path="/" element={<AppList />} />
            <Route path="/form" element={<TheForm />} />
            <Route path="/post/:slug" element={<AppSinglePost />}></Route>
            <Route path="/login" element={<AppLogin />} />
            {/* Rotte private */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <AppDashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
