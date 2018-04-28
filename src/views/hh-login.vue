<style scoped>
  #app{display:table;width:100%}
  .main-title{text-align:center}
  .des{text-align:center;color:#999;margin-bottom:2em}
  .login-form{width:400px;margin:13% auto 0;}
  .login-page{background:#fff}
</style>
<template>
  <div>
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form">
        <h1 class="main-title">
          <a href="http://refined-x.com/2017/11/28/Vue2.0%E7%94%A8%E6%88%B7%E6%9D%83%E9%99%90%E6%8E%A7%E5%88%B6%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/" target="_blank">Vue-Access-Control</a>
        </h1>
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
          <el-button style="width:100%" @click.native="getAuthority" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import CryptoJs from "crypto-js";
  import instance from "../api/index.js";
  import * as util from "../assets/util.js";
  //登录
  const requestLogin = params =>{
    let words = CryptoJS.enc.Utf8.parse(params.password);
    let base64 = CryptoJS.enc.Base64.stringify(words);
    params.password = base64;
    return axios.get(`http://rap2api.taobao.org/app/mock/224/web`, {params})
  }

  export default{
    data(){
      return{
        username:'',
        password:'',
        isBtnLoading:false
      }
    },
    computed:{
      btnText(){
        if(this.isBtnLoading) return '登陆中...';
        return '登陆';
      }
    },
    methods:{
      getAuthority(){
        let vm = this;
        vm.isBtnLoading = true;
        let token_url = 'https://www.easy-mock.com/mock/5ad706b939b4875243eda157/example/hh/login?user=admin'
        axios.get(token_url).then((res)=>{
          vm.isBtnLoading = false;
          if(res.data.data){
            util.session('token',res.data.data);
            console.log(vm.$router.currentRoute.query.from);
            vm.$emit('login',vm.$router.currentRoute.query.from);
            //      sessionStorage.setItem('token',res.data.data.token);
          }else{
            return Promise.reject({
              message:'登陆异常'
            })
          }
        }).catch(util.catchError);
      }
    },
    created(){
      sessionStorage.clear();
    }
  }
</script>
