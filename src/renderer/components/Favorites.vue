<template>
  <div class="content-wrapper padding-x" >
    <!--<user></user>-->
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{'简介就可 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  import User from './User/User.vue'

  export default {
    name: 'favorites',
    components: {
      User,
    },
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
