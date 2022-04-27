import React from "react";

function Navbar() {
  return (
    <div className="w-screen bg-gray-50 py-3 text-center text-3xl font-semibold text-teal-700 font-serif">
      {" "}
      Form Builder
    </div>
  );
}

export default React.memo(Navbar);
