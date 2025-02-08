export const createSlug = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, "-");
};
