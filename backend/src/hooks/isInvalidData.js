const isInvalidData = (data) => {
  return (
    data === undefined ||
    data === null ||
    data === "" ||
    data === "undefined" ||
    data === "null" ||
    data === "0" ||
    data === 0
  );
};

module.exports = { isInvalidData };
