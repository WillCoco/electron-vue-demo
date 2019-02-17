<template>
  <div class="content-wrapper" >
    <keep-alive>
      <div id="map-wrapper" class="map-wrapper">
      </div>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    data: function() {
        return {
            zoomValue: 15,
            minZoom: 20,
            maxZoom: 5,
            map: null,
            center: [120.147839,30.32137501]
        }
    },
    name: 'footprint',
    mounted() {
        this.map = new BMap.Map("map-wrapper");
        const center = new BMap.Point(...this.center);
        this.map.centerAndZoom(center, this.zoomValue);
        this.map.enableScrollWheelZoom();
    },
    methods: {
    },
  };
</script>

<style>
  .map-wrapper {
    width: 100%;
  }

</style>
