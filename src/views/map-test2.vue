<style scoped>
  #allmap{
    width:600px;
    height:600px;
  }
</style>
<template>
  <div>
    <button type="button" @click="createdMap">生成地图</button>
    <div id="allmap">

    </div>
  </div>
</template>
<script>
//  import * as mapLoad from '../assets/loadmap'
//  import * as mapLoad from '../assets/bMap/js/api_v2.0.js'
//  import {init} from '../assets/bMap/js/api_v2.0.js'
  export default{
    name:'',
    data(){
      return{

      }
    },
    methods:{
      createdMap(){
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
        // 编写自定义函数,创建标注
        function addMarker(point){
          var marker = new BMap.Marker(point);
          map.addOverlay(marker);
        }
        // 随机向地图添加25个标注
        var bounds = map.getBounds();
        var sw = bounds.getSouthWest();
        var ne = bounds.getNorthEast();
        var lngSpan = Math.abs(sw.lng - ne.lng);
        var latSpan = Math.abs(ne.lat - sw.lat);
        for (var i = 0; i < 25; i ++) {
          var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
          addMarker(point);
        }

      }
    },
    mounted(){
//      mapLoad.init();
    }
  }
</script>
