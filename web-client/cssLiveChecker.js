export default function check(selector) {
  try {
    return (document.querySelector(selector) !== null);
  } catch (error) {
    return true;
  }
}
