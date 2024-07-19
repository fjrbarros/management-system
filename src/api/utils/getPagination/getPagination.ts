export const getPagination = (page = 0, size = 10) => {
  const limit = size ? +size : 1;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};
