export default function getImgUrl(name) {
  return new URL(`../assets/img/${name}`, import.meta.url).href;
}
