import React from "react";
import { Outlet } from "react-router-dom";

const MainLayaout = () => {
  return (
    <>
      <main className="container mx-auto mt-5  p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5 max-h-screen">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayaout;
