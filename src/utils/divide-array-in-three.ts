export const divideArrayInThree = <T,>(arr: T[]) => {
  const partSize = Math.ceil(arr.length / 3);
  const firstPart = arr.slice(0, partSize);
  const secondPart = arr.slice(partSize, partSize * 2);
  const thirdPart = arr.slice(partSize * 2);

  return [firstPart, secondPart, thirdPart];
};
