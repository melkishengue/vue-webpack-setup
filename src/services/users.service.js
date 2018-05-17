import axios from 'axios';
// import request from 'request';

export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// export default class UserAPI {
//
//   constructor() {
//     this.baseURL = 'https://jsonplaceholder.typicode.com';
//   }
//
//   getUsers() {
//     return new Promise(function (resolve, reject) {
//       request(this.baseURL + '/users', (error, res, body) => {
//         console.log("body");
//         if (!error && res.statusCode == 200) {
//           resolve(body);
//         } else {
//           reject(error);
//         }
//       });
//     });
//   }
// }
