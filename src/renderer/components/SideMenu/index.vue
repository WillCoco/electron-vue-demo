<template>
    <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse">
        <router-link class="no-underline" to="/home">
            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">主页</span>
            </el-menu-item>
        </router-link>
        <router-link class="no-underline" to="/footprint">
            <el-menu-item index="2">
                <i class="el-icon-location"></i>
                <span slot="title">足迹</span>
            </el-menu-item>
        </router-link>
        <router-link class="no-underline" to="/favorites">
            <el-menu-item index="3">
                <i class="el-icon-star-on"></i>
                <span slot="title">收藏</span>
            </el-menu-item>
        </router-link>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    },
    mounted() {
    },
  };
</script>

<style scoped>
    .no-underline {
        text-decoration: none
    }
</style>
