import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import SingleForm from "./pages/SingleForm";
import SingleFormCreate from "./pages/SingleFormCreate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/create" element={<SingleFormCreate />} />
        <Route path="/a/:id" element={<SingleForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
