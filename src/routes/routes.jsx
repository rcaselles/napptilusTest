import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Detail } from "../pages/Detail";
import { Homepage } from "../pages/Homepage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
