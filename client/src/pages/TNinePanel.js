import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { NUMBERS } from "../config/utils";

import WordBox from "../components/WordBox";
import Keyboard from "../components/Keyboard";
import SynonymsBox from "../components/SynonymsBox";

const TNinePanel = () => {
  const [inputNumbers, setInputNumbers] = useState({ numbers: "" });
  const [suggestedWords, setSuggestedWords] = useState([]);
  const [synonyms, setSynonyms] = useState([]);

  useEffect(() => {
    if (inputNumbers.numbers === "") {
      setSuggestedWords([]);
      setSynonyms([]);
    } else {
      APIcall(inputNumbers.numbers);
    }
    setSynonyms([]);
  }, [inputNumbers]);

  const findSynonyms = useCallback(
    async (word) => {
      if (synonyms.length === 0) {
        await axios
          .get(`${process.env.REACT_APP_SYNONYMS_URL}/${word}`)
          .then((res) => {
            res.data.forEach((response) => {
              const suggestedSynonyms = response.meanings[0].synonyms;
              if (suggestedSynonyms.length !== 0) {
                setSynonyms([
                  ...synonyms,
                  suggestedSynonyms[
                    [Math.floor(Math.random() * suggestedSynonyms.length)]
                  ],
                ]);
              }
            });
          });
      }
    },
    [synonyms]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (suggestedWords.length !== 0) {
        suggestedWords.forEach((word) => {
          findSynonyms(word);
        });
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [suggestedWords, findSynonyms]);

  const handleKeyInput = (e) => {
    console.dir(e);
    let event = e || window.event;
    const regex = /[0-9]|\./;
    let keyPress;

    //* Handle paste
    if (event.type === "paste") {
      keyPress = e.clipboardData.getData("text/plain");
    } else {
      //* Handle key press
      keyPress = event.nativeEvent.data;
      keyPress = parseInt(keyPress);
    }

    if (
      regex.test(keyPress) ||
      event.nativeEvent.inputType === "deleteContentBackward"
    ) {
      setInputNumbers({
        //* actual state
        ...inputNumbers,
        [e.target.name]: e.target.value,
      });
    } else {
      event.returnValue = false;
      if (event.preventDefault) event.preventDefault();
    }
  };

  const handleClick = (value) => {
    setInputNumbers({
      //* actual state
      numbers: (inputNumbers.numbers += value),
    });
  };

  const APIcall = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/suggested_words`, { data })
      .then((res) => {
        if (res.data.status === 404) {
          Swal.fire("Something went wrong!", res.data.msg, "error");
        } else {
          setSuggestedWords(res.data.data);
        }
      });
  };

  return (
    <>
      <div className="text-red-600 font-black text-5xl ">T9 Keyboard</div>
      <form className="" onSubmit={(e) => e.preventDefault()}>
        <div className=" mt-5">
          <label
            htmlFor="inputNumbers"
            className="uppercase text-gray-600 block text-xl- font-bold"
          >
            Numbers
          </label>
          <input
            data-testid="input"
            id="inputNumbers"
            name="numbers"
            type="number"
            min="0"
            value={inputNumbers.numbers}
            placeholder="Insert some numbers"
            className="w-full mt-3  p-3 border rounded-xl bg-gray-50"
            onChange={handleKeyInput}
          />
        </div>
      </form>

      <div className="my-5  flex flex-wrap justify-center">
        {Object.entries(NUMBERS).map(([key, val]) => (
          <Keyboard
            key={key}
            handleClick={handleClick}
            number={key}
            value={val}
          />
        ))}
        {
          <Keyboard
            key={0}
            handleClick={handleClick}
            number={0}
            value={'" "'}
          />
        }
      </div>
      <div className="flex justify-end">
        <button className="  bg-yellow-400 py-1 hover:bg-yellow-500 px-2 m-1 py-1 text-xs shadow-sm hover:shadow font-medium tracking-wider border-2 border-yellow-300 hover:border-yellow-100 text-white rounded-full transition ease-in duration-300">
          Suggested
        </button>
        <button className="  bg-blue-400  hover:bg-blue-500 px-2 m-1 py-1 text-xs shadow-sm hover:shadow font-medium tracking-wider border-2 border-blue-300 hover:border-blue-100 text-white rounded-full transition ease-in duration-300">
          Synonyms
        </button>
      </div>

      {suggestedWords.length !== 0 && (
        <div className=" bg-white w-auto max-h-80 shadow flex overflow-y-auto  flex-wrap rounded-lg px-5 py-3 ">
          {suggestedWords.msg
            ? console.log(suggestedWords.msg)
            : suggestedWords.map(
                (word) => word !== null && <WordBox key={word} word={word} />
              )}
          {synonyms &&
            synonyms.map(
              (word) => word !== null && <SynonymsBox key={word} word={word} />
            )}
        </div>
      )}

      {inputNumbers.numbers !== "" && suggestedWords.length === 0 && (
        <p className="text-red-600 font-black text-xl ">No words found </p>
      )}
    </>
  );
};

export default TNinePanel;
