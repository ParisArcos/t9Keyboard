import React, { useState } from "react";

const Keyboard = ({ handleClick, number, value }) => {
  const [effect, setEffect] = useState(false);

  return (
    <button
      className={`${
        effect && "animate-scale"
      } min-w-1/6 w-1/6 border rounded m-1 text-white p-1 center bg-gray-300 hover:shadow hover:bg-gray-500 border-gray-500 hover:border-gray-50`}
      onClick={() => {
        setEffect(true);
        handleClick(number);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      <h1 className="font-bold">{`${number}`}</h1>
      <p className="italic">{`${value}`}</p>
    </button>
  );
};

export default Keyboard;
