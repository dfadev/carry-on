export default function keys(object) {
  return object ? Object.getOwnPropertyNames(object) : [];
}
