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
        <div class="tags">
            <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">标签</span>
            </el-menu-item>
            <div v-for="id in tags">
                <a @click="getSoul(id)" href="#" class="tag-text no-underline">{{ id }}</a><a
                    @click="editTag()" href="#" class="el-icon-delete no-underline tag-del"></a>
            </div>
        </div>

        <router-link class="no-underline split" to="/DBSplit">
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">分割</span>
            </el-menu-item>
        </router-link>
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
      getSoul(userId) {
        this.$store.dispatch('getSoul', {userId});
      },
      editTag: function(isAdd) {
        const { userId } = this.$store.state.souls.soul || {};
        this.$store.dispatch('editTag', {userId, isAdd})
      }
    },
    computed: {
      tags: function () {
        return this.$store.state.souls.tags
      }
    },
    mounted() {
    },
  };
</script>

<style scoped>
    .no-underline {
        text-decoration: none
    }
    .tags {
        height: 60%;
        overflow: auto;
    }
    .split {
        position: fixed;
        bottom: 38px;
    }
    .tag-text {
        color: rgb(255, 255, 255);
        margin-left: 20px;
        font-size: 12px;
    }
    .tag-del {
        color: #fff;
        margin-left: 6px;
        font-size: 12px;
    }
</style>
