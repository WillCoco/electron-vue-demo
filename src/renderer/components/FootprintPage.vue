<template>
  <div class="content-wrapper" >
    <div id="map-wrapper" class="map-wrapper">
    </div>
    <el-button @click="focus(-1)" class="btn-focus-prev" size="mini" icon="el-icon-arrow-left" circle></el-button>
    <p class="mark-index">{{ focusIndex + 1 }} / {{ markQty }}</p>
    <el-button @click="focus(1)" class="btn-focus-next" size="mini" icon="el-icon-arrow-right" circle></el-button>
  </div>
</template>

<script>
  export default {
    name: 'footprint',
    data: function() {
      return {
        mode: 0, // one soul，favorite，all
        focusIndex: 0, // 聚焦第几个footprint
        markQty: 0,
        zoomValue: 15,
        minZoom: 20,
        maxZoom: 5,
        map: null,
        center: [120.147839,30.32137501]
      }
    },
    computed: {

    },
    methods: {
      // 添加足迹
      addMark(postions) {
        let markQty = 0;
        postions.forEach(d => {
          if (d.latitude && d.longitude) {
            const marker = new BMap.Marker(new BMap.Point(d.longitude, d.latitude));
            this.map.addOverlay(marker);
            markQty++
          }
        });
        this.markQty = markQty;
      },
      // 聚焦足迹
      focus(offset) {
        const { coordinate } = this.$store.state.souls.soul;
        if (offset > 0 && this.markQty > this.focusIndex + 1) {
          this.focusIndex++;
          this.center = [coordinate[this.focusIndex].longitude, coordinate[this.focusIndex].latitude];
          const center = new BMap.Point(...this.center);
          this.map.centerAndZoom(center, this.zoomValue);
        }
        if (offset < 0 && 0 < this.focusIndex) {
          this.focusIndex--;
          this.center = [coordinate[this.focusIndex].longitude, coordinate[this.focusIndex].latitude];
          const center = new BMap.Point(...this.center);
          this.map.centerAndZoom(center, this.zoomValue);
        }
      }
    },
    mounted() {
      const { coordinate } = this.$store.state.souls.soul;

      this.map = new BMap.Map("map-wrapper");
      this.map.enableScrollWheelZoom();

      // addMark
      this.addMark(coordinate);

      // 根据位置修正中心点
      this.center = [coordinate[this.focusIndex].longitude, coordinate[this.focusIndex].latitude];

      // 渲染地图
      const center = new BMap.Point(...this.center);
      this.map.centerAndZoom(center, this.zoomValue);
    },
  };
</script>

<style>
  .map-wrapper {
    width: 100%;
  }
  .btn-focus-prev {
    position: fixed;
    top: 38px;
    right: 128px;
  }
  .btn-focus-next {
    position: fixed;
    top: 38px;
    right: 48px
  }
  .mark-index {
    position: fixed;
    top: 42px;
    right: 88px
  }

</style>
