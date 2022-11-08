import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components";

function App() {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar.offsetHeight;
    const mainTag = document.querySelector("main");
    mainTag.style.marginTop = `${navbarHeight}px`;
  }, []);

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      {/* <footer className="shadow-apps mt-3 py-3 bg-white">
        <Footer />
      </footer> */}
    </>
  );
}


export default App;
