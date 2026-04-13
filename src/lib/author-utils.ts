export type ParsedAuthor = {
  name: string;
  isMe: boolean;
  equalContrib: boolean;
};

export function parseAuthors(authors: string[]): ParsedAuthor[] {
  return authors.map((raw) => {
    const equalContrib = raw.endsWith("*");
    const name = equalContrib ? raw.slice(0, -1) : raw;
    return { name, isMe: name === "Zhuo Cai", equalContrib };
  });
}
