<style scoped>
  #app{display: table;width:100%;}
  .main-title{text-align: center;}
  .des{text-align: center;color:#999;margin-bottom: 2em;}
  .login-form{width: 400px;margin:13% auto 0;}
  .login-page{background:#fff;}
</style>
<template>
  <div>
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form">
        <h1 class="main-title"><a href="http://refined-x.com/2017/11/28/Vue2.0%E7%94%A8%E6%88%B7%E6%9D%83%E9%99%90%E6%8E%A7%E5%88%B6%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/" target="_blank">Vue-Access-Control</a></h1>
        <p class="des">Frontend access control framework based Vue</p>
        <el-form-item>
          <el-input
            :autofocus="true"
            placeholder="请输入账号"
            v-model="username">
            <template slot="prepend"><i class="el-icon-mobile-phone"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="password">
            <template slot="prepend"><i class="el-icon-info"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="getToken" type="primary">获取token</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="insTest2" type="primary">instance2</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="login2" type="primary">requestLoginTest</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="getAuthority" type="primary">获取路由权限</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="quiteLogin" type="primary">退出登陆</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="addRoutes" type="primary">注入路由</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="getAuthority2" type="primary">获取模拟token</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from "crypto-js";
import instance2 from '../api/axios-instance.js';
import * as util from '../assets/util.js';
//登录
const requestLogin = params => {
  let words = CryptoJS.enc.Utf8.parse(params.password);
  let base64 = CryptoJS.enc.Base64.stringify(words);
  params.password = base64;
  return axios.get(`http://rap2api.taobao.org/app/mock/224/web`, {params})
};

const requestLoginTest = params => {
  let words = CryptoJS.enc.Utf8.parse(params.password);
  let base64 = CryptoJS.enc.Base64.stringify(words);
  params.password = base64;
//  return instance2.post('/token-test',params).then(function(res){
//    console.log(res.data)
//  }).catch(function(error){
//    console.log(error)
//  })
  return axios.post('/api/uaa/user/route',{params})
}

const requestLoginAuthority = params => {
  return axios.post('/api/uaa/user/router',params)
}

export default {
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    getToken(){
//      axios.post('http://192.168.43.3:8769/uaa/oauth/token',{
//        username:'admin',
//        password:'123456',
//        Authorization:'Basic YnJvd3Nlcjo=',
//        grant_type:'password'
//      })
      let params = new URLSearchParams();
      params.append('username','admin')
      params.append('password','123456')
      params.append('grant_type','password')
//      axios.post('/api/token',params).then((res)=>{
//      })
      axios({
        method:'post',
//        url:'https://www.easy-mock.com/mock/5ad706b939b4875243eda157/example/token-test',
        url:'/api/uaa/oauth/token',
        data:params,
        headers:{
          "Authorization":'Basic YnJvd3Nlcjo='
        }
    }).then(res=>{
        if(res.data){
          util.session('token',res.data.access_token);
          instance2.defaults.headers.common['Authorization'] = 'Bearer '+res.data.access_token
          console.log(res.data)
        }
      })
    },
    getAuthority(){
      axios.post('/api/uaa/user/route').then(function(res){
        console.log(res.data)
      })
//      axios({
//        method:'post',
//        url:'/api/uaa/user/route',
//        headers:{
//          "Authorization":'Bearer '+sessionStorage.token
//        }
//      })
    },
    getAuthority2(){
      axios.get(' https://www.easy-mock.com/mock/5ad706b939b4875243eda157/example/hh/login?user=admin').then((res)=>{
      console.log(res.data);
      util.session('token',res.data.data.token);
//      sessionStorage.setItem('token',res.data.data.token);
      })
    },
    quiteLogin(){
      axios.post('/api/uaa/user/userLogout').then((res)=>{
        console.log('已退出')
      })
    },
    insTest2(){
      let params = new URLSearchParams();
      params.append('username','admin')
      params.append('password','123456')
      params.append('grant_type','password')

      instance2.post("/token-test",params).then(function(res){
        console.log(res.data)
      }).catch(function(error){
        console.log(error)
      })
    },
    login() {
      var vm = this;
      if (!vm.username) {
        vm.$message.error('请填写用户名！！！');
        return;
      }
      if (!vm.password) {
        vm.$message.error('请填写密码');
        return;
      }

      let loginParams = {name: vm.username, password: vm.password};
      vm.isBtnLoading = true;
      requestLogin(loginParams).then(res => {
        vm.isBtnLoading = false;
        if(res.data.token){
          util.session('token', res.data);
          vm.$emit('login', vm.$router.currentRoute.query.from);
        }else{
          return Promise.reject({
            message: '登录异常！'
          });
        }
      }).catch(util.catchError);
    },
    login2(){
      var vm = this;
      if(!vm.username){
        vm.$message.error('请填写用户名!!!');
        return;
      }
      if(!vm.password){
        vm.$message.error('请填写密码');
        return
      }
      let loginParams = {name:vm.username,password:vm.password};
      vm.isBtnLoading = true;
      requestLoginTest(loginParams).then(res=>{
        vm.isBtnLoading = false;
        console.log(res.data);
        if(res.data.data){
          util.session('token',res.data.data.token);
          vm.$emit('login',vm.$router.currentRoute.query.from);
        }else{
          return Promise.reject({
            message:'登陆异常!'
          })
        }
      }).catch(util.catchError);
    },
    addRoutes(){
      vm.$router.addRoutes(
        [
          {
            path:'/auth',
            component: (resolve) => require(['../views/auth-test.vue'], resolve)
          }
          ]
      )
    }
  },
  created() {
    sessionStorage.clear();
  }
};
</script>
