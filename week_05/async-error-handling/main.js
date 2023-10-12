const API_URL = 'https://jsonplaceholder.typicode.com'

function getUserByIdAndUsername(id, username) {
  return fetch(`${API_URL}/users/${id}`)
    .then(res => {
      if (res.status === 400) {
        throw new Error(`Could not find a user with id ${id}`);
      } else if (res.status !== 200) {
        throw new Error(`Something went wrong when getting user with id ${id}`);
      }
      return res.json();
    })
    .then(user => {
      if (user.username !== username) {
        throw new Error(`The user with id ${id} does not have username ${username}`);
      }
      return user;
    })
}

const body = document.body;
const resultElement = document.getElementById('result');
const queryParams = new URLSearchParams(location.search);

body.classList.add('loading');

getUserByIdAndUsername(queryParams.get('id'), queryParams.get('username'))
  .then(user => {
    resultElement.innerText = JSON.stringify(user);
    resultElement.style.display = 'block';
  })
  .catch(err => {
    alert(`Error: ${err}`);
  })
  .finally(_ => {
    body.classList.replace('loading', 'done');
  });