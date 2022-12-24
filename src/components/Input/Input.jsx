import React from "react";
import "./styles.css";
export default function Input({ ...props }) {
  return <input type="text" {...props}></input>;
}
