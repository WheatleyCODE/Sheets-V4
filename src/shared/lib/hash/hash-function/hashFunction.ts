export const hashFunction = (value: SerializableValue): string => {
  let hash = 5381;
  const string = JSON.stringify(value);

  for (let i = 0; i < string.length; i++) {
    hash += (hash * 33) ^ string.charCodeAt(i);
  }

  return hash.toString();
};
