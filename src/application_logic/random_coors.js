export default function createRandomMove() {
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);
  return {
    row,
    col,
  };
}
