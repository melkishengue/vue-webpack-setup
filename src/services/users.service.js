import axios from 'axios';

let baseURL = 'https://jsonplaceholder.typicode.com';

export default {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      axios.get(baseURL + '/users', {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        resolve(response);
      })
    })
  }
}
