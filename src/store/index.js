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
      username:'',
      level:-1
    }
  },
  getters: {
    isLogin: state => state.user.username ? true : false,
    username: state => state.user.username,
    level: state => state.user.level
  },
  mutations:{
    updateUser:(state,user) => {
      console.log('this state:'+state);
      console.log('this user:'+ JSON.stringify(user));
      state.user.username = user.username;
      state.user.level = user.level;
    }
  }
})