import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import TableUsers from "../components/TableUsers";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default AppRoutes;
