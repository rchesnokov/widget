interface DeclensionMap {
  one: string;
  few: string;
  many: string;
}

export const declension = (count: number, words: DeclensionMap) => {
  return count === 0 || (count >= 11 && count <= 20)
    ? words.many
    : count % 10 === 1
    ? words.one
    : count % 10 >= 2 && count % 10 <= 4
    ? words.few
    : words.many;
};
