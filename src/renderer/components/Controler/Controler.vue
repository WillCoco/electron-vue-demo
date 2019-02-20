<template>
  <div>
    <el-button @click="favor(!isFavorite)" class="btn-favorite" v-bind:type="isFavorite ? 'danger' : 'info'" icon="el-icon-star-on" circle></el-button>
    <el-button @click="getSoul(-1)" class="btn-per" size="mini" icon="el-icon-caret-top" circle></el-button>
    <el-button @click="getSoul(1)" class="btn-next" size="mini" icon="el-icon-caret-bottom" circle></el-button>
  </div>
</template>

<script>
  export default {
    name: 'controler',
    data: function() {
      return {
      }
    },
    computed: {
      isFavorite() {
        const { isFavorite } = this.$store.state.souls.soul || {};
        return isFavorite;
      },
    },
    mounted() {

    },
    methods: {
      getSoul: function(offset) {
        this.$store.dispatch('getSoul', {offset});
      },
      favor: function(isFavor) {
        this.$store.dispatch('favor', {isFavor});
      }
    },
  };
</script>

<style scoped>
  .btn-favorite {
    position: fixed;
    top: 48px;
    right: 48px;
  }
  .btn-per {
    position: fixed;
    top: 108px;
    right: 54px;
  }
  .btn-next {
    position: fixed;
    top: 140px;
    right: 54px;
  }
  .favoriteOn {
    background: #ccc;
  }
  .favoriteOff {
    background: #ff0000;
  }
</style>
