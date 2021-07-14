
const getData = () => fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if(response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status} — ${response.statusText}`);
    }
  });

export {getData};
