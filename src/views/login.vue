<!-- 登陆页面 -->
<script>
export default {
  data: () => ({
    userid: '',
    userRole: [
      value => {
        if (/^\d+$/.test(value)) return true
        return '请输入正确的学号/工号'
      },
    ],
    password: '',
    passwordRole: [
      value => {
        if (value?.length > 0) return true
        return '密码不能为空'
      },
    ],
  }),
  data(){
    return {
      userid:'',
      password:''
    }
  },
  methods:{
    login(){

    }
  }
}
</script>
<template>
  <div id="login_page">
    <div id="entry">
      <div>
        <img src="/src/assets/image_word.png" />
        <div id="other_login">
          <v-btn id="btn" prepend-icon="mdi-account-circle" variant="text" size="x-large" block>
            GitHub
            <img src="../assets/GitHub_Icon.png" id="icon">
          </v-btn>
          <v-btn id="btn" prepend-icon="mdi-account-circle" variant="text" size="x-large" block>
            WeChat
            <img src="../assets/WX_Icon.png" id="icon">
          </v-btn>
          <v-btn id="btn" prepend-icon="mdi-account-circle" variant="text" size="x-large" block>
            QQ
            <img src="../assets/QQ_Icon.png" id="icon">
          </v-btn>
          <hr/>
        </div>
        <div id="login">
          <v-sheet class="mx-auto" color="FAFAFA" min-width="180px">
            <v-form id="inputs" fast-fail @submit.prevent>
              <p>学号/工号 :</p>
              <v-text-field id="input" v-model="userid" :rules="userRole"
                base-color="white" placeholder="请输入学号/工号(数字)" bg-color="white" color="white"></v-text-field>
              <p>密码 :</p>
              <v-text-field id="input" v-model="password" :rules="passwordRole"
                base-color="white" placeholder="请输入密码" bg-color="white" color="white"></v-text-field>
              <div id="button">
                <v-btn id="btn2" class="mt-auto" type="submit" variant="outlined" max-width="112px">登 录(教师)</v-btn>
                <v-btn id="btn2" class="mt-auto" type="submit" variant="outlined" max-width="112px">登 录(学生)</v-btn>
              </div>
            </v-form>
          </v-sheet>
        </div>
      </div>
    </div>
    <div id="introduce">
    </div>
  </div>
</template>
<style scoped>
#login_page {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #FAFAFA;
}
#input{
  border: 1px #e3e3e3 solid;
}
#entry {
  width: 32%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#entry > div{
  margin:144px 64px;
}

#other_login {
  display: flex;
  flex-direction: column;
}

hr{
  margin: 16px 0 16px 0;
}

#btn {
  margin-top: 16px;
  border: 1px #e3e3e3 solid;
  background-color: #FFFFFF;
  position: relative;
}

#inputs{
  margin: 12px 0 12px 0; background-color: #FAFAFA;
}
#inputs > p{
  margin: 0 0 8px 0;
}

#button {
  display: flex;
  background-color: #FAFAFA;
}

#button #btn2 {
  margin-right: 16px;
  background-color: #383838;
  color: #FFFFFF;
  padding: 0 16px;
}

#entry div>img {

  width: auto;
  height: 64px;
  margin: 0 0 34px;
  max-width: 74%;
  height: auto;
}

#icon {
  width: 30px;
  position: absolute;
  left: 310px;


}

#introduce {
  width: 78%;
  background-image: url(../assets/banner.png);
}
</style>