import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axiosConfig from "../config/axios";

const TNinePanel = () => {
  const [inputNumbers, setInputNumbers] = useState([]);
  const [suggestedWords, setSuggestedWords] = useState([]);

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

  const APIcall = async (data) => {
    await axiosConfig.post("/suggested_words", { data }).then((res) => {
      if (res.data.status === 401) {
        Swal.fire("Something went wrong!", res.data.message, "error");
      } else {
        setSuggestedWords(res.data);
      }
    });
    console.log(suggestedWords);
  };

  return (
    <>
      <div className="text-red-600 font-black text-5xl ">
        T9 Keyboard Simulator
      </div>

      <form className="my-10 bg-white shadow rounded-lg px-10 py-5 ">
        <div className="my-5">
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
            placeholder="Insert numbers to see suggested words"
            className="w-full mt-3 mb-5 p-3 border rounded-xl bg-gray-50"
            onChange={handleChange}
          />
        </div>
      </form>
      {inputNumbers.numbers !== "" && (
        <p>{suggestedWords.length !== 0 ? `${suggestedWords}` : ""}</p>
      )}
    </>
  );
};

export default TNinePanel;
