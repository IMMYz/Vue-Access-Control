<style lang="scss" scoped>
  .zyhj-submenu-warp {
    background-color: #090723;
    a {
      color: #fff;
      text-decoration: none;
    }
    .zyhj-submenu{
      width:1160px;
      height:25px;
      margin:0 auto;
      ul{
        margin:0;
        padding:0;
        li{
          &:nth-child(1){
            padding-left:0
          }
          float:left;
          list-style:none;
          padding:0 10px;
          .router-link-active{
            border-bottom:2px solid rgb(255, 208, 75)
          }
        }
      }
    }
  }
  .zyhj-main-content-warp{
    width:1160px;
    margin:0 auto
  }
</style>

<template>
  <div>
    <div class="zyhj-submenu-warp">
      <div class="zyhj-submenu">
        <ul>
          <li v-for="item in childrenMenus" ref="subItem">
            <router-link :to="'/home/'+item.path">{{item.name}}</router-link>
          </li>
        </ul>
        <div style="clear:both"></div>
      </div>
    </div>
    <div class="zyhj-main-content-warp">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default ({
    data() {
      return {
        menus: [],
        childrenMenus: []
      }
    },
    computed: {},
    methods:{

    },
    created: function () {
      let menus = this.$parent.menus;
      console.log(menus);
      if (menus) {
        this.menus = menus
      }
      ;
      let arr = [];
      for (let i = 0; i < this.menus.length; i++) {
        if (this.menus[i].name == '首页') {
          this.childrenMenus = this.menus[i].children;
        }
      }
    }
  })
</script>
