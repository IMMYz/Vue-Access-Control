import axios from 'axios';
import * as util from '../assets/util.js';

const instance2 = axios.create({
  baseURL: 'https://www.easy-mock.com/mock/5ad706b939b4875243eda157/example',
  timeout: 30000
});

instance2.defaults.headers.post['Content-Type'] = 'application/json';
//错误处理
instance2.interceptors.response.use(function(response) {
  return response;
}, util.catchError);

export default instance2;
