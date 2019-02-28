<template>
  <div class="area-wrapper">
    <el-card class="box-card" :bodyStyle="rowCard">
      <div class="user-card-basic" v-bind:style="card">
        <img class="avatar" v-bind:src="avatar" alt="avatar">
        <p class="text-normal text-id">avatar: {{ soul.userInfo && soul.userInfo.avatarName }}</p>
        <p class="text-normal text-id">用户id: {{ soul.userId }}</p>
        <p v-if="soul.signature" class="text-normal text-id">用户签名: {{ soul.signature }}</p>
        <p class="text-normal text-time">注册时间: {{ registerTime }}</p>
      </div>
      <div class="user-box-info">
        <p class="user-item-info">邮箱: {{ soul.mail || '暂无' }}</p>
        <p class="user-item-info">
          空间: <span v-if="!qqZone">暂无</span>
          <img class="padding-left" v-if="qqZone" src="../../images/qqzone.png" alt="">
          <el-button @click="open(qqZone)" class="button" size="mini" icon="el-icon-arrow-right" circle></el-button>
        </p>
        <p class="user-item-info">位置: {{ soul.position }}</p>
        <p class="user-item-info">
          足迹: {{ footprintLength }}
          <el-button @click="goFootprint()" class="button" size="mini" icon="el-icon-arrow-right" circle></el-button>
        </p>
      </div>
    </el-card>
    <div class="box-post">
      <div v-for="post in soul.post" :key="post.id" class="text item">
        <el-card @click="copyText(post.content)" class="post-card" :bodyStyle="columnCard">
          <div v-for="attach in post.attachments">
            <img v-if="/^image/.test(attach.fileUrl)" class="post-img" v-bind:src="getPostImg(attach.fileUrl)" alt="">
            <video v-else-if="/^video/.test(attach.fileUrl)" class="post-img" v-bind:src="getPostImg(attach.fileUrl)" controls="controls">
            </video>
          </div>
          <p @click="copyText(post.content)">{{ post.content }}</p>
        </el-card>

      </div>
    </div>

  </div>
</template>

<script>
  import { clipboard } from 'electron';

  export default {
    name: 'user',
    data: function() {
      const { userInfo = {} } = this.soul || {};
      return {
        card: {
          background: `url(${userInfo.userBackgroundUrlNew})`,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
        },
        rowCard: {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          padding: 0,
        },
        columnCard:{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          padding: 0,
        },
      }
    },
    computed: {
      soul: function() {
        console.log(this.$store.state.souls.soul.post);
        return this.$store.state.souls.soul || {}
      },
      avatar: function() {
        const { userInfo = {} } = this.$store.state.souls.soul || {};
        const { avatarName } = userInfo;
        // console.log(this.avatarBasic + avatarName + '.png', '======')
        return this.avatarBasic + avatarName + '.png';
      },
      registerTime: function() {
        const { userInfo = {} } = this.$store.state.souls.soul || {};
        const { registerTime } = userInfo;
        const d = new Date(registerTime);
        return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
      },
      footprintLength: function() {
        const { coordinate = {} } = this.$store.state.souls.soul || {};
        const { length } = coordinate;
        return length || '暂无'
      },
      qqZone: function() {
        const { mail } = this.$store.state.souls.soul || {};
        if (!/@qq.com/.test(mail)) {
          return;
        }
        const qq = mail.replace(/@qq.com$/, '');
        return `https://user.qzone.qq.com/${qq}`
      },
      goFootprint: function() {
        this.$router.push(`/footprint`)
      },
    },
    mounted() {
    },
    methods: {
      open(link) {
        if (link) {
          this.$electron.shell.openExternal(link);
        }
      },
      getPostImg(img) {
        return this.postImgBasic + img
      },
      copyText(text = '') {
        clipboard.writeText(text.substring(0, 15))
      }
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .area-wrapper {
    width: 100%;
  }
  .box-card {
    display: flex;
    flex-direction: row;
    height: 200px;
    width: 100%;
  }
  .user-card-basic {
    height: 100%;
    width: 200px;
    padding: 20px;
    position: relative;
  }
  .user-box-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 24px;
    padding-left: 5%;
  }
  .text-id, .text-time {
    margin-top: 4px
  }
  .user-item-info {
    display: flex;
    align-items: center;
    height: 40px;
    position: relative;
  }
  .padding-left {
    padding-left: 10px
  }
  .button {
    margin-left: 10px;
    position: absolute;
    left: 30%;
    top: 4px
  }
  .box-post {
    margin-top: 24px;
    column-count: 3;
    column-gap: 24px;
  }
  .post-card {
    box-sizing: border-box;
    break-inside: avoid;
    padding: 8px;
    margin-bottom: 24px
  }
  .post-img {
    width: 100%;
  }


</style>
