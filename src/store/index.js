import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 音乐是否在播放
    AudioPlayEndAbslo: false,
    // 音乐播放时长
    duratio: 0,
    // 音乐播放总时长
    canplyAudio: 0,
    // 音乐播放列表
    MusiclistOf: [],
    // 歌曲id
    MusicId:1970554402,

    //元素高亮
    active: 1,

    // 电台是否播放
    RadioPlayEndAbslo: false,

    // 电台id
    RadioId: null,

    // 专辑数据歌单id
    searchId: null,

    // 专辑数据歌单显示隐藏
    searchShow: false,

    // 推荐数据歌单id
    searchIdtwo: null,

    // 推荐数据歌单显示隐藏
    searchShowtwo: false,

    // 电台id
    searchIdthree: null,

      //电台数据
      searchShowthree: false,

    // 页面颜色
    homecolor: '',

    // 搜索记录
    searchDataLoc: [],

    // 历史播放数据
    historyDataLoc: [],

    // 播放歌曲的索引
    playIndex: 0,


  },
  getters: {},
  mutations: {
    getsearchDataLoc(state, data) {
      state.searchDataLoc = data
    },
    highlightedActive(state, active) {
      state.active = active
    },
    AudioPlay(state, AudioPlayEndAbslo) {
      state.AudioPlayEndAbslo = AudioPlayEndAbslo
    },
    // 修改音乐播放时长
    getDuratio(state, duratio) {
      state.duratio = duratio
    },
    // 获取音乐播放总时长
    getCanplyAudio(state, canplyAudio) {
      state.canplyAudio = canplyAudio
    },
    RadioPlayEnd(state, RadioPlayEndAbslo) {
      state.RadioPlayEndAbslo = RadioPlayEndAbslo
    },
    thisRadioId(state, RadioId) {
      state.RadioId = RadioId
    },
    // 专辑数据歌单id
    searchIdend(state, searchId) {
      state.searchId = searchId
    },
    // 专辑数据歌单显示隐藏 新碟
    searchShowend(state, searchShow) {
      state.searchShow = searchShow
    },

    // 推荐数据歌单id
    searchIdendtwo(state, searchIdtwo) {
      state.searchIdtwo = searchIdtwo
    },
    // 推荐数据歌单显示隐藏  推荐歌单
    searchShowendtwo(state, searchShowtwo) {
      state.searchShowtwo = searchShowtwo
    },
    // searchIdthree
    getsearchIdthree(state,searchIdthree){
      state.searchIdthree = searchIdthree
    },
    getsearchShowthree(state, searchShowthree) {
      state.searchShowthree = searchShowthree
    },
    
    // 获取歌单列表
    getMusiclistOf(state, MusiclistOf) {
      state.MusiclistOf = MusiclistOf
    },

    // 获取歌曲id
    getMusicId(state, MusicId) {
      state.MusicId = MusicId
    },

    gethomecolor(state,homecolor){
      state.homecolor = homecolor
    },

    // 历史播放数据
    gethistoryDataLoc(state, historyDataLoc) {
      state.historyDataLoc = historyDataLoc
    },

    // 歌曲索引
    getplayIndex(state, playIndex) {
      state.playIndex = playIndex
    }
  },
  actions: {},
  modules: {}
})