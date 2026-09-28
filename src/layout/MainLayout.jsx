import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Books from "../pages/books/Books";
import Authors from "../pages/authors/Authors";
import Borrows from "../pages/borrows/Borrows";
const MainLayout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/borrows" element={<Borrows />} />
      </Routes>
    </>
  );
};

export default MainLayout;
