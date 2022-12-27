import React from "react";
import { Routes, Route } from "react-router-dom";
import { Detail } from "../pages/Detail";
import { Homepage } from "../pages/Homepage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  );
};

export default AppRoutes;
