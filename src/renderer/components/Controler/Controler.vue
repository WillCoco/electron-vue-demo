<template>
  <div>
    <el-button @click="favor(!isFavorite)" class="btn-favorite" v-bind:type="isFavorite ? 'danger' : 'info'" icon="el-icon-star-on" circle></el-button>
    <el-button @click="getSoul(-1)" class="btn-per" size="mini" icon="el-icon-caret-top" circle></el-button>
    <el-button @click="getSoul(1)" class="btn-next" size="mini" icon="el-icon-caret-bottom" circle></el-button>
    <el-button @click="editTag(!isTag)" class="el-icon-menu btn-tag" v-bind:class="{'btn-tag-active': isTag}" type="text"> {{ isTag ? '取消' : '加入' }}标签</el-button>
  </div>
</template>

<script>
  export default {
    name: 'controler',
    data: function() {
      return {
      }
    },
    computed: {
      isFavorite() {
        const { isFavorite } = this.$store.state.souls.soul || {};
        return isFavorite;
      },
      isTag: function() {
        const { tags = [], soul } = this.$store.state.souls || {};
        console.log(tags, 1010100);
        return tags.indexOf(soul.userId) !== -1;
      }
    },
    mounted() {

    },
    methods: {
      getSoul: function(offset) {
        this.$store.dispatch('getSoul', {offset});
      },
      favor: function(isFavor) {
        this.$store.dispatch('favor', {isFavor});
      },
      editTag: function(isAdd) {
        const { userId } = this.$store.state.souls.soul || {};
        this.$store.dispatch('editTag', {userId, isAdd})
      }
    },
  };
</script>

<style scoped>
  .btn-favorite {
    position: fixed;
    top: 48px;
    right: 48px;
  }
  .btn-per {
    position: fixed;
    top: 108px;
    right: 54px;
  }
  .btn-next {
    position: fixed;
    top: 140px;
    right: 54px;
  }
  .btn-tag {
    position: fixed;
    top: 48px;
    right: 104px;
    color: #666
  }
  .btn-tag-active {
    color: dodgerblue;
  }
  .favoriteOn {
    background: #ccc;
  }
  .favoriteOff {
    background: #ff0000;
  }

</style>
