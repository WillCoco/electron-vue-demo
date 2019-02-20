<template>
  <div id="wrapper" class="content-wrapper padding-x">
      <el-button @click="split()" class="btn-split" v-bind:icon="splitIcon">分割数据</el-button>
  </div>
</template>

<script>
  import { splitDatabase } from '../../database/index'

  export default {
    name: 'DBSplit',
    components: {
    },
    data: function() {
      return {
        isSplitting: false
      }
    },
    mounted() {
      console.log(this.isSplitting, 'isSplitting')
    },
    computed: {
      splitIcon() {
        console.log(this.isSplitting ? 'el-icon-loading' : 'el-icon-edit', 19238);
        return this.isSplitting ? 'el-icon-loading' : 'el-icon-edit'
      }
    },
    methods: {
      async split() {
        this.isSplitting = true;
        await splitDatabase();
        this.isSplitting = false;
        console.log(splitDatabase, 'dbbbb');
      },
    },
  };
</script>

<style scoped>
  .btn-split {
    align-self: center;
  }
</style>
