const calcHash = (string: string): number => {
  let hash = 5381;

  for (let i = 0; i < string.length; i++) {
    hash += (hash * 33) ^ string.charCodeAt(i);
  }

  return hash;
};

export const hashFunction = (value: SerializableValue): string => {
  let string = '';

  if (!Object.isPrimitive(value)) {
    string += '{';

    for (const [key, val] of Object.entries(value)) {
      if (typeof val === 'function') {
        string += `f:[k:${key}],`;
      } else {
        string += `p:[k:${key}, v:${val}],`;
      }
    }

    string += '{';

    return calcHash(string).toString();
  }

  return calcHash(String(value)).toString();
};
