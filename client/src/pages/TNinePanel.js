import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axiosConfig from "../config/axios";

import WordBox from "../components/WordBox";
import Keyboard from "../components/Keyboard";

const TNinePanel = () => {
  const [inputNumbers, setInputNumbers] = useState({ numbers: "" });
  const [suggestedWords, setSuggestedWords] = useState([]);

  const NUMBERS = {
    0: '" "',
    1: "a, b, c",
    2: "d, e, f",
    3: "g, h, i",
    4: "j, k, l",
    5: "m, n, o",
    6: "p, q, r",
    7: "s, t, u",
    8: "v, w, x",
    9: "y, z",
  };

  useEffect(() => {
    if (inputNumbers !== "") {
      APIcall(inputNumbers.numbers);
    }
  }, [inputNumbers]);

  const handleChange = (e) => {
    setInputNumbers({
      //* actual state
      ...inputNumbers,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (value) => {
    setInputNumbers({
      //* actual state

      numbers: (inputNumbers.numbers += value),
    });
  };

  const APIcall = async (data) => {
    await axiosConfig.post("/suggested_words", { data }).then((res) => {
      if (res.data.status === 401) {
        Swal.fire("Something went wrong!", res.data.message, "error");
      } else {
        setSuggestedWords(res.data);
      }
    });
  };

  return (
    <>
      <div className="text-red-600 font-black text-5xl ">T9 Keyboard</div>
      <form className="">
        <div className=" mt-5">
          <label
            htmlFor="inputNumbers"
            className="uppercase text-gray-600 block text-xl- font-bold"
          >
            Numbers
          </label>
          <input
            id="inputNumbers"
            name="numbers"
            type="number"
            value={inputNumbers.numbers}
            placeholder="Insert numbers to see suggested words"
            className="w-full mt-3 mb-5 p-3 border rounded-xl bg-gray-50"
            onChange={handleChange}
          />
        </div>
      </form>

      <div className=" mt-1">
        <span
          htmlFor="inputNumbers"
          className="uppercase text-gray-600 block text-xl- font-bold"
        >
          Text
        </span>
        <p className="w-full mt-3 mb-5 p-3 border rounded-xl bg-gray-50">
          {" "}
          Texto aqui{" "}
        </p>
      </div>
      <div className="my-5 flex flex-wrap justify-center">
        {Object.entries(NUMBERS).map(([key, val]) => (
          <Keyboard
            key={key}
            handleClick={handleClick}
            number={key}
            value={val}
          />
        ))}
      </div>
      {inputNumbers.numbers !== "" && (
        <div className=" bg-white w-auto max-h-80 shadow flex overflow-y-auto  flex-wrap rounded-lg px-5 py-3 ">
          {!suggestedWords.msg &&
            suggestedWords.map(
              (word) => word !== null && <WordBox key={word} word={word} />
            )}
        </div>
      )}
    </>
  );
};

export default TNinePanel;
