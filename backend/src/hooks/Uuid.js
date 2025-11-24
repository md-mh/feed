const getUuidV4 = async () => {
  const { v4 } = await import("uuid");
  return v4;
};

const GenerateUuid = async () => {
  const uuidv4 = await getUuidV4();
  return uuidv4();
};

module.exports = { GenerateUuid };
