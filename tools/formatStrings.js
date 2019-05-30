const firstLetterCase = (str) => {
  let returnStr = str.toLowerCase().split("");
  returnStr[0] = returnStr[0].toUpperCase();
  return returnStr.join("");
};

export { firstLetterCase };
