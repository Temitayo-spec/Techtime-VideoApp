function getFirstLetters(str: string): string {
  const words = str.split(' ');
  const firstLetters = words.map((word) => word.charAt(0));
  return firstLetters.join('');
}

export default getFirstLetters;
