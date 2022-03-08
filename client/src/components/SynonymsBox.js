import React, { useState } from "react";

const SynonymsBox = ({ word }) => {
  const [effect, setEffect] = useState(false);
  return (
    <button
      className={`${
        effect && "animate-wiggle"
      } h-1/4 bg-blue-400  hover:bg-blue-500 px-2 m-1 py-2 text-xs shadow-sm hover:shadow font-medium tracking-wider border-2 border-blue-300 hover:border-blue-100 text-white rounded-full transition ease-in duration-300`}
      onClick={() => {
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {`${word}`}
    </button>
  );
};

export default SynonymsBox;
