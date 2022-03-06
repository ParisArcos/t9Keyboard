import { readFileSync } from "fs";
import path from "path";

let rootNode = {};
let words = [];

const getValues = (input) => {
  let inputLetters = [];

  const t9KeyboardMatrix = JSON.parse(
    readFileSync(path.resolve("config/t9_keyboard.json"), "utf8")
  );

  input.forEach((number) => {
    inputLetters.push(t9KeyboardMatrix[`${number}`]);
  });
  return inputLetters;
};

const createTree = (input) => {
  const inputLetters = getValues(input);
  let previousParents = [rootNode];

  inputLetters.forEach((arrayOfLetters) => {
    const is_leaf =
      inputLetters.indexOf(arrayOfLetters) === inputLetters.length - 1
        ? true
        : false;

    createNode(arrayOfLetters, is_leaf, previousParents);

    previousParents = getParents(previousParents);
  });
  return rootNode;
};

const getParents = (previousParents) => {
  let parents = [];
  previousParents.forEach((parent) => {
    parent.child1 ? parents.push(parent.child1) : null;
    parent.child2 ? parents.push(parent.child2) : null;
    parent.child3 ? parents.push(parent.child3) : null;
  });
  return parents;
};

const createNode = (arrayOfLetters, is_leaf, previousParents) => {
  previousParents.forEach((parent) => {
    parent.child1 = {
      parent: parent,
      value: arrayOfLetters[0],
      is_leaf: is_leaf,
    };
    parent.child2 = {
      parent: parent,
      value: arrayOfLetters[1],
      is_leaf: is_leaf,
    };
    arrayOfLetters[2]
      ? (parent.child3 = {
          parent: parent,
          value: arrayOfLetters[2],
          is_leaf: is_leaf,
        })
      : null;
  });
};

const readWordsFromTree = (node) => {
  if (node === null) return;

  if (node.is_leaf) {
    let currentNode = node;
    let wordArray = [];

    while (currentNode.parent) {
      wordArray.push(currentNode.value);
      currentNode = currentNode.parent;
    }
    words.push(
      wordArray.reverse().reduce((word, letter) => {
        return word + letter;
      })
    );
  }

  node.child1 != null ? readWordsFromTree(node.child1) : null;
  node.child2 != null ? readWordsFromTree(node.child2) : null;
  node.child3 != null ? readWordsFromTree(node.child3) : null;

  return words;
};

export const suggestWords = (input) => {
  const tree = createTree(input);
  const suggestedWords = readWordsFromTree(tree);
  return suggestedWords;
};
