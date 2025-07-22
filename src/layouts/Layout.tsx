import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Header />
    <main
      style={{
        flex: 1,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        padding: "20px",
      }}
    >
      <Outlet />
    </main>
      <Footer />
    </div>
  );
};

export default Layout;
