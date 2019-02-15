<template>
  <div id="wrapper">
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'homePage',
    created() {
      console.log(this.$db, 111000);
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  #wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    padding: 40px;
  }

  .box-card {
    width: 80%;
  }

</style>
