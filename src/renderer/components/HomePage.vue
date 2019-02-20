<template>
  <div id="wrapper" class="content-wrapper padding-x">
      <user></user>
      <controler></controler>
  </div>
</template>

<script>
  import User from './User/User.vue'
  import Controler from './Controler/Controler.vue'

  export default {
    name: 'homePage',
    components: {
      User,
      Controler
    },
    data: function() {
      return {
      }
    },
    mounted() {
    },
    computed: {
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
