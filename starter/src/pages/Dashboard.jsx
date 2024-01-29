import React from "react";
import { Info, Navbar, Repos, Search, User } from "../components";
import { globalContext } from "../context/context";
import Imagespinner from "../assets/images/preloader.gif";

function Dashboard() {
  const { loading } = globalContext();
  if (loading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img
          src={Imagespinner}
          alt="loading"
          style={{
            width: "10rem",
            height: "10rem",
            margin: "0 auto",
            marginTop: "10rem",
          }}
        />
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
}

export default Dashboard;
