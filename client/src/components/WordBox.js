import React, { useState } from "react";

const WordBox = ({ word }) => {
  const [effect, setEffect] = useState(false);
  return (
    <button
      data-testid={`word-${word}`}
      className={`${
        effect && "animate-wiggle"
      } h-1/4 bg-yellow-400  hover:bg-yellow-500 px-2 m-1 py-2 text-xs shadow-sm hover:shadow font-medium tracking-wider border-2 border-yellow-300 hover:border-yellow-100 text-white rounded-full transition ease-in duration-300`}
      onClick={() => {
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {`${word}`}
    </button>
  );
};

export default WordBox;
