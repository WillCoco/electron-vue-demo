<template>
  <div class="content-wrapper padding-x" >
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{'简介就可 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'favorites',
    data: function() {
      return {

      }
    },
    mounted() {
    },
    methods: {
    },
  };
</script>

<style>


</style>
