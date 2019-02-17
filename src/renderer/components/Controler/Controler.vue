<template>
  <div>
    <el-button class="btn-favorite" type="danger" icon="el-icon-star-on" circle></el-button>
    <el-button @click="getSoul(false)" class="btn-per" size="mini" icon="el-icon-caret-top" circle></el-button>
    <el-button @click="getSoul(true)" class="btn-next" size="mini" icon="el-icon-caret-bottom" circle></el-button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'controler',
    data: function() {
      return {
        isFavorite: false
      }
    },
    computed: {
    },
    mounted() {
      console.log(this, 888)
    },
    methods: {
      getSoul(isNext) {
        console.log(this.$store.dispatch('getSoul'), 9999)
        this.$store.dispatch('getSoul');
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
</style>
