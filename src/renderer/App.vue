<template>
  <div id="app">
    <side-menu class="side-menu"></side-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import SideMenu from './components/SideMenu/index';
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
  .content-wrapper {
    height: 100vh;
    width: 100%;
    justify-content: center;
    display: flex;
    overflow: auto;
    position: relative;
  }
  .padding-x {
    padding: 24px;
  }
  .text-normal {
    font-size: 14px
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #fff;
    margin-right: 8px;
  }
  .side-menu {

  }
</style>
