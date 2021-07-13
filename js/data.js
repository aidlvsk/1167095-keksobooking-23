
const getData = () => fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json());

export {getData};
