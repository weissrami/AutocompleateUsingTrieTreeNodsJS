// Prefix tree TRIE for quick search words by prefix
// https://en.wikipedia.org/wiki/Trie
// useMemoization: uses extensive memory caching, keep each options in each leaf. should be used with cation to large dictionary size

const USE_MEMO = true;

const initPrefixNode = () => {
  return { words: [], children: {} };
};

var buildNextPrefixNode = (node, char, word) => {
  // get or create next node and populate it
  if (!node.children[char]) {
    node.children[char] = initPrefixNode();
  }
  if (USE_MEMO && word) node.words.push(word);
  return node.children[char];
};

var rootWordsNode;
var load = (words) => {
  rootWordsNode = initPrefixNode();
  words.forEach((word) => {
    let wordIndex = 0;
    let currentNode = rootWordsNode;
    if (USE_MEMO) {
      // cache word in node's word list
      rootWordsNode.words.push(word);
    }
    while (wordIndex < word.length - 1) {
      // go over all of word chars and build next nodes for them
      currentNode = buildNextPrefixNode(currentNode, word[wordIndex], word);
      wordIndex++;
    }
    currentNode = buildNextPrefixNode(currentNode, word[wordIndex], word);
    currentNode.words = [word];
  });

  return words;
};

var collectAllWordsFromNode = (node, results = []) => {
  // traverse the tree and find all matching words
  if (node.words.length > 0) {
    results.push(node.words[0]);
  } else if (Object.keys(node.children).length > 0) {
    collectAllWordsFromNode(node, results);
  }
  return results;
};

const findWordsByPrefix = (prefix, limit) => {
  if (!prefix) throw Error("Empty prefix");
  const prefixCharacters = prefix.split("");
  let prefixWordNode = rootWordsNode;
  prefixCharacters.forEach((c) => {
    prefixWordNode =
      prefixWordNode && prefixWordNode.children
        ? prefixWordNode.children[c]
        : undefined;
  });

  if (USE_MEMO) {
    return prefixWordNode
      ? limit
        ? prefixWordNode.words.slice(0, limit)
        : prefixWordNode.words
      : [];
  } else {
    return collectAllWordsFromNode(prefixWordNode);
  }
};

module.exports = { load, findWordsByPrefix };
