export default meta => {
  const { toArr, fromArr, toIndex, fromIndex } = meta;

  if (toArr.length === 0) return 1;

  if (toIndex === toArr.length || toIndex == null)
    return Math.ceil(toArr[toArr.length - 1].order + 1);

  if (toIndex === 0) return toArr[0].order / 2;

  if (toArr === fromArr && toIndex > fromIndex) {
    if (toIndex === toArr.length - 1) return toArr[toIndex].order + 1;
    return (toArr[toIndex].order + toArr[toIndex + 1].order) / 2;
  }

  return (toArr[toIndex].order + toArr[toIndex - 1].order) / 2;
};
