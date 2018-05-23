import axios from 'axios'
import * as util from '../assets/util.js'

// const instance2 = axios.create({
//   baseURL:'https://www.easy-mock.com/mock/5ad706b939b4875243eda157/example',
//   timeout:10000,
// })

const instance2 = axios.create({
  // baseURL:'http://192.168.20.123:8769',
  baseURL: 'https://www.easy-mock.com/mock/5ad706b939b4875243eda157',
  timeout:10000
})

// instance2.defaults.headers.common['Authorization'] = '123'
// instance2.defaults.headers.post['Content-Type'] = 'application/json';
export default instance2;
