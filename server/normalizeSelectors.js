module.exports = function normalizeSelectorsJSON(data) {
  if (Array.isArray(data)) {
    return data;
  }
  return Object.values(data)
    .reduce((acc, el) => {
      acc.push(...el.data);
      return acc;
    }, [])
    .map(el => el.trim())
    .reduce((acc, el) => (acc.includes(el) ? acc : [...acc, el]), []);
};
