export default function Ship(length) {
  let numOfHit = 0;
  if (isNaN(length)) {
    throw new Error('Length must be a number');
  }

  const getNumOfHit = () => numOfHit;

  const hit = () => {
    numOfHit += 1;
  };

  const isSunk = () => numOfHit >= length;

  return { getNumOfHit, isSunk, hit };
}
