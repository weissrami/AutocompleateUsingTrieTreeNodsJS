const path = require("path");
const fs = require("fs");

const { load, findWordsByPrefix } = require("./prefix");

let words = [];
const loadDictionaryFromFile = (filePath, loadFunc) => {
  const fileContent = fs.readFileSync(filePath);
  words = fileContent.toString().split("\n");
  const dictionary = load(words);
  return dictionary.length;
};

let filePath = path.join(__dirname, "..", "data", "dictionary.txt");
let wordsLength = loadDictionaryFromFile(filePath, load);

const setDict = (filePath) => {
  wordsLength = loadDictionaryFromFile(filePath, load);
};

const getDictLength = () => {
  return wordsLength;
};

module.exports = { getDictLength, setDict, findWordsByPrefix };
