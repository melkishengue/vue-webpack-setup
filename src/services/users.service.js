let baseURL = 'https://jsonplaceholder.typicode.com';

export default {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      fetch(baseURL + '/users').then(async (response) => {
        let json = await response.json();
        resolve(json);
      }).catch(reject);
    })
  }
}
