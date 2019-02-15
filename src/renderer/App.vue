<template>
  <div id="app">
    <side-menu class="side-menu"></side-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import SideMenu from './components/SideMenu';
  export default {
    name: 'soul-reaper',
    components: { SideMenu },
  };
</script>

<style>
  /* CSS */
  #app {
    display: flex;
  }

  .side-menu {

  }
</style>
