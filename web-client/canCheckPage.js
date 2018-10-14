export function markThisPageAsCheck(key) {
  localStorage.setItem(key, 1);
}

export function canCheckPage(key) {
  const alreadyParse = localStorage.getItem(key);
  if (alreadyParse) {
    return false;
  }
  return true;
}
