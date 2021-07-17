// Add your ES6+ javascript here
function getContent(offset, num) {
  let arr = [];
  for (var i = offset; i < offset + num; i++) {
    arr.push(i);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(arr);
    }, Math.random() * 2000);
  });
}

const button = document.querySelector('.btn-get-boxes');
const container = document.querySelector('.container');
const loadingLabel = document.querySelector('.lbl-loading');

const makeItem = (value) => {
  const item = document.createElement('div');
  item.className = 'item';
  item.innerHTML = value;
  return item;
}




let currentoffset = 0;
const numberOfColumns = 11;
const numberOfRows = 6;
const totalNumberOfItemsToGet = numberOfColumns * numberOfRows;

let data = [];
let isLoading = false;

console.log('Test');

/**
 *   const height = e.target.getBoundingClientRect().height;
 const scrollHeight = e.target.scrollHeight; // ?
 const scrollTop = e.target.scrollTop;

 if (scrollHeight - height - scrollTop < 10) {}
 *
 */

const loadItemsFromApi = () => {
  isLoading = true;
  loadingLabel.innerHTML = 'I am loading';
  getContent(currentoffset, totalNumberOfItemsToGet)
    .then(r =>  r.forEach(i => container.appendChild(makeItem(i))))
    .then(() => currentoffset += totalNumberOfItemsToGet)
    .then(() => {
      isLoading = false;
      loadingLabel.innerHTML = 'idle';

    })
};

loadItemsFromApi();

container.addEventListener('scroll', (e) => {
  if (isLoading) {
    return;
  }
  console.log('>>>>', e);
  const height = e.target.getBoundingClientRect().height;
  const scrollHeight = e.target.scrollHeight;
  const scrollTop = e.target.scrollTop;

  if (scrollHeight - height - scrollTop < 10) {
    console.log('hello');
    loadItemsFromApi();
  }
});

button.addEventListener('click',  loadItemsFromApi);
