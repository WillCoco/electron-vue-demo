<template>
  <div id="wrapper" class="content-wrapper padding-x">
      <user v-bind:data="data"></user>
      <controler></controler>
  </div>
</template>

<script>
  import User from './User/User.vue'
  import Controler from './Controler/Controler.vue'
  import data from '../model/users'

  export default {
    name: 'homePage',
    components: {
      User,
      Controler
    },
    data: function() {
      return {
          data
      }
    },
    mounted() {
      console.log(this.$db, 111000);
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>

<style scoped>


</style>
