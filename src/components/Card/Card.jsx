import React from "react";
import "./styles.css";

export default function Card({ children, ...props }) {
  return (
    <div className="card" {...props}>
      {children}
    </div>
  );
}
