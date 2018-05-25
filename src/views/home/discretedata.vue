<style scoped>

</style>

<template>
  <div>
    离散数据
    <router-view></router-view>
  </div>
</template>

<script>
  export default ({
    data(){
      return{
        menus:[]
      }
    },
    computed:{
      test(){
        console.log('discretedata')
      }
    }
  })
</script>
