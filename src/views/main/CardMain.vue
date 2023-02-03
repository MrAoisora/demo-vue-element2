<template>
  <div>
    <el-row>
      <div class="titleContent">
        {{ title }}
      </div>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8" v-for="count in 8" :key="count">
        <div class="cardContent">
          <div class="cardText">{{ count }}</div>
          <div class="cardImg">
            <img src="../../images/backgroud_image2.jpg" style="width: 100%;height: 100%">
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'CardMain',
  data () {
    return {
      title: '项目实施'
    }
  }
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.titleContent {
  font-family: "Microsoft YaHei";
  font-size: 18px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: left;
}

.cardContent {
  background-color: #8cc5ff;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  .cardText {
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
    padding-left: 16px;
  }
  .cardImg {
    width: 20%;
    height: 100%;
  }
}

</style>
