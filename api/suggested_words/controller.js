import { suggestWords } from "./services.js";

export const createSuggestedWords = (req, res) => {
  try {
    const words = suggestWords(req.body.data);
    words ? res.json(words) : res.json({ msg: "Suggested words not found" });
  } catch (error) {
    return error.message;
  }
};
