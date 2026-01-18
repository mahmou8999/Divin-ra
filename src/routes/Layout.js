import React from "react";
import NavBar from "../components/navbar&footer/NavBar";
import { Outlet } from "react-router";
import Footer from "../components/navbar&footer/Footer";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;

