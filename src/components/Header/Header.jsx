import React from "react";
import "./styles.css";

export default function Header() {
  return (
    <div className="header">
      <div className="header-brand">
        <img
          src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
          alt="Searcher logo"
          className="logo"
        />
        <p className="header-title">Oompa Loompa's Crew</p>
      </div>
    </div>
  );
}
