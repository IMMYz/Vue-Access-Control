<style scoped>

</style>

<template>
  <div>
    222
    {{childrenMenus}}
    <template v-for="item in childrenMenus">
      <router-link :to="item.path" append>{{item.name}}</router-link>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
  export default ({
    data(){
      return{
        menus:[],
        childrenMenus:[]
      }
    },
    computed:{
    },
    created:function(){
      let menus = this.$parent.menus;
      console.log(menus);
      if(menus){
        this.menus = menus
      };
      let arr = [];
      for(let i = 0;i<this.menus.length;i++){
        if(this.menus[i].name == '首页'){
          this.childrenMenus = this.menus[i].children;
        }
      }
    }
  })
</script>
