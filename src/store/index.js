/**
 * Created by Administrator on 2018/7/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  state:{
    user:{
      id:'',
      nickname:'',
      level:-1,
      telephone:''
    }
  },
  getters: {
    isLogin: state => state.user.telephone ? true : false,
    id: state => state.user.id,
    nickname: state => state.user.nickname,
    level: state => state.user.level,
    telephone: state => state.user.telephone
  },
  mutations:{
    updateUser:(state,user) => {
      state.user.id = user.id;
      state.user.nickname = user.nickname;
      state.user.level = user.level;
      state.user.telephone = user.telephone;
    }
  }
})