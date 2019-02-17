<template>
  <div class="area-wrapper">
    <el-card class="box-card" :bodyStyle="rowCard">
      <div class="user-card-basic" v-bind:style="card">
        <img class="avatar" v-bind:src="avatar" alt="avatar">
        <p class="text-normal text-id">用户id: {{ data.userId }}</p>
        <p class="text-normal text-time">注册时间: {{ registerTime }}</p>
      </div>
      <div class="user-box-info">
        <p class="user-item-info">邮箱: {{ data.mail || '暂无' }}</p>
        <p class="user-item-info">
          空间: <span v-if="!qqZone">暂无</span>
          <img class="padding-left" v-if="qqZone" src="../../images/qqzone.png" alt="">
          <el-button @click="open(qqZone)" class="button" size="mini" type="success">前往</el-button>
        </p>
        <p class="user-item-info">位置: {{ data.position }}</p>
        <p class="user-item-info">
          足迹: {{ footprintLength }}
          <el-button @click="goFootprint()" class="button" size="mini" type="success">前往</el-button>
        </p>
      </div>
    </el-card>
    <div class="box-post">
      <div v-for="post in data.post" :key="post.id" class="text item">
        <el-card class="post-card" :bodyStyle="columnCard">
          <div v-for="attach in post.attachments">
            <img v-if="/^image/.test(attach.fileUrl)" class="post-img" v-bind:src="getPostImg(attach.fileUrl)" alt="">
            <video v-else-if="/^video/.test(attach.fileUrl)" class="post-img" v-bind:src="getPostImg(attach.fileUrl)" controls="controls">
            </video>
          </div>
          <p>{{ post.content }}</p>
        </el-card>

      </div>
    </div>

  </div>
</template>

<script>
  import data from '../../model/users'

  export default {
    name: 'user',
    props: {data: Object},
    data: function() {
      return {
        card: {
          background: `url(${data.info.userBackgroundUrlNew})`,
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
        }
      }
    },
    computed: {
      avatar: function() {
        const { avatarName } = this.data.info || {};
        return this.avatarBasic + avatarName + '.png';
     },
      registerTime: function() {
        const { registerTime } = this.data.info || {};
        const d = new Date(registerTime);
        return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
      },
      footprintLength: function() {
        const { length } = this.data.coordinate || {};
        return length || '暂无'
      },
      qqZone: function() {
        const { mail } = this.data || {};
        if (!/@qq.com/.test(mail)) {
          return;
        }
        const qq = mail.replace(/@qq.com$/, '');
        return `https://user.qzone.qq.com/${qq}`
      },
      goFootprint: function() {
        this.$router.push(`/footprint/:${this.data.userId}`)
      },
    },
    mounted() {
      console.log(this.props, 'props')
    },
    methods: {
      open(link) {
        if (link) {
          this.$electron.shell.openExternal(link);
        }
      },
      getPostImg(img) {
        console.log(this.postImgBasic + img, 1112)
        return this.postImgBasic + img
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
    padding: 20px
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
