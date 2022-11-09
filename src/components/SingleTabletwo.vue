<template>
    <div class="hera">
        <van-popup
            :value="show"
            position="right"
            :style="{ height: '100%', width: '100%' }"
            class="popups"
        >
            <!-- 页面加载不出来的时候可以退出 -->

            <!-- 如果数据还没请求出来会旋转 -->

            <div class="loadingnamesTo">
                <van-loading
                    color="#0094ff"
                    size="80px"
                    class="loadingnames"
                    v-show="thesearchId != searchIdtwo"
                />
            </div>

            <div class="ssd" ref="scrol" @scroll="scs($event)">
                <div
                    class="nav-top"
                    :class="{ 'ground-color': scrollds >= 300 }"
                >
                    <div class="dianz1">
                        <van-icon name="arrow-left" @click="exit" />
                    </div>
                    <div class="dianz2" v-show="scrollds >= 300">
                        {{ axoData.creator?.nickname }}
                    </div>
                    <div class="dianz">
                        <i class="wd-icon-more"></i>
                    </div>
                </div>
                <!--  -->
                <!-- {{ axoData }} -->
                <div class="main" v-show="thesearchId == searchIdtwo">
                    <div
                        class="nav-img"
                        :style="{
                            'background-image': `url(${axoData.coverImgUrl})`,
                        }"
                    >
                        <!-- <img src="../assets/img/dzq.jpg" alt=""> -->
                        <div class="nav-name">
                            <div class="nav-name-one">{{ axoData.name }}</div>
                            <div class="nav-name-two">
                                {{ axoData.description?.split("\n").join(" ") }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 名字和头像和喜欢和分析  v-show="thesearchId == searchIdtwo"-->
                <div class="main-seco" v-show="thesearchId == searchIdtwo">
                    <div class="seco-img">
                        <img
                            :src="axoData.creator?.avatarUrl"
                            alt=""
                            v-lazy="axoData.creator?.avatarUrl"
                        />
                        <div class="seco-tiname">
                            {{ axoData.creator?.nickname }}
                        </div>
                    </div>
                    <div class="seco-icon">
                        <div class="aixin" @click="aixinGao">
                            <div
                                class="aixin-icon"
                                :class="{ col1: aiLove == searchIdtwo }"
                            >
                                <van-icon name="like" />
                            </div>
                            <div class="aixin-num">{{ aixin }}</div>
                        </div>
                        <div class="aixin" @click="zhuanfaGao">
                            <div
                                class="aixin-icon"
                                :class="{ col2: zhuanfanum == searchIdtwo }"
                            >
                                <van-icon name="share" />
                            </div>
                            <div class="aixin-num">{{ zhuanfa }}</div>
                        </div>
                    </div>
                </div>
                <!-- 音乐播放的全部歌曲  -->
                <div v-show="thesearchId == searchIdtwo">
                    <MusicTabletwo
                        :axoDatamusic="axoDatamusic"
                        :thesearchId="thesearchId"
                    />
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MusicTabletwo from "./SingleTable/MusicTabletwo.vue";
export default {
    data() {
        return {
            axoData: [],
            axoDatamusic: [],
            thesearchId: null,

            img: "",
            // 滚动高度
            scrollds: 0,

            // 爱心
            // 判断爱心
            aixin: 0,
            aixinMath: [],
            // 判断爱心
            aiLove: false,

            // 转发
            zhuanfa: 0,
            zhuanfaMath: [],
            // 判断转发
            zhuanfanum: false,
        };
    },
    computed: {
        ...mapState(["searchIdtwo", "searchShowtwo"]),
        show() {
            return this.searchShowtwo;
        },
    },
    methods: {
        ...mapMutations(["searchShowendtwo", "searchIdendtwo"]),

        // 点击爱心高亮
        aixinGao() {
            // linkMath没有this.searchId时push进去
            if (this.aixinMath.indexOf(this.searchIdtwo) == -1) {
                this.aixinMath.push(this.searchIdtwo);
                localStorage.setItem(
                    "aixinMath",
                    JSON.stringify(this.aixinMath)
                );
                // 如果this.aixin有万字就不添加
                this.aixin = this.aixin + 1;

                this.aiLove = this.searchIdtwo;
            } else {
                this.aixinMath.splice(this.aixinMath.indexOf(this.searchIdtwo), 1);
                localStorage.setItem(
                    "aixinMath",
                    JSON.stringify(this.aixinMath)
                );
                this.aixin = this.aixin - 1;
                this.aiLove = "";
            }
            localStorage.setItem("aixinGao", JSON.stringify(this.aixinMath));

            // searchIdtwo
        },

        //点击转发高亮
        zhuanfaGao() {
            // linkMath没有this.searchIdtwo时push进去
            if (this.zhuanfaMath.indexOf(this.searchIdtwo) == -1) {
                this.zhuanfaMath.push(this.searchIdtwo);
                localStorage.setItem(
                    "zhuanfaMath",
                    JSON.stringify(this.zhuanfaMath)
                );
                // 如果this.zhuanfa有万字就不添加
                this.zhuanfa = this.zhuanfa + 1;
                this.zhuanfanum = this.searchIdtwo;
            } else {
                this.zhuanfaMath.splice(
                    this.zhuanfaMath.indexOf(this.searchIdtwo),
                    1
                );
                localStorage.setItem(
                    "zhuanfaMath",
                    JSON.stringify(this.zhuanfaMath)
                );
                this.zhuanfa = this.zhuanfa - 1;
                this.zhuanfanum = "";
            }
            localStorage.setItem(
                "zhuanfaGao",
                JSON.stringify(this.zhuanfaMath)
            );

            // searchIdtwo
        },

        // 获取滚动高度
        scs(eve) {
            console.log(eve.target.scrollTop);
            // // console.log(this.$refs.scrol);
            this.scrollds = eve.target.scrollTop;
        },

        aixhezhuanf(ids) {
            if (localStorage.getItem("aixinGao") == null) {
                // 创建一个localStorage
                localStorage.setItem("aixinGao", JSON.stringify([]));
            } else {
                this.aixinMath = JSON.parse(localStorage.getItem("aixinGao"));
                if (this.aixinMath.indexOf(ids) == -1) {
                    this.aiLove = "";
                } else {
                    this.aixin = this.aixin + 1;
                    this.aiLove = ids;
                }
            }

            if (localStorage.getItem("zhuanfaGao") == null) {
                // 创建一个localStorage
                localStorage.setItem("zhuanfaGao", JSON.stringify([]));
            } else {
                this.zhuanfaMath = JSON.parse(
                    localStorage.getItem("zhuanfaGao")
                );
                if (this.zhuanfaMath.indexOf(ids) == -1) {
                    this.zhuanfanum = "";
                } else {
                    this.zhuanfa = this.zhuanfa + 1;
                    this.zhuanfanum = ids;
                }
            }
        },

        // 关闭页面
        exit() {
            this.searchShowendtwo(false);
            // 爱心那些清零
        },
        // https://apis.netstart.cn/music/playlist/detail?id=153345099
        ddsaxios(ids) {
            this.$axios
                .get("/playlist/detail", {
                    params: {
                        id: ids,
                    },
                })
                .then((res) => {
                    console.log("新碟上架", res);

                    this.axoData = res.playlist;
                    this.axoDatamusic = res.playlist.tracks;
                    console.log("this.axoDatamusic", this.axoDatamusic);
                    this.thesearchId = ids;
                });

            // 爱心和转发
            // https://apis.netstart.cn/music/album/detail/dynamic?id=149367827
            this.$axios
                .get("/playlist/detail", {
                    params: {
                        id: ids,
                    },
                })
                .then((res) => {
                    console.log("爱心和转发", res);
                    let datas = res.playlist;
                    this.aixin = this.aixin + datas.subscribedCount;

                    this.zhuanfa = this.zhuanfa + datas.shareCount;
                });
        },
    },
    watch: {
        searchIdtwo: function (val) {
            // alert(val)
            // console.log("val", val);
            this.ddsaxios(val);
            this.aixhezhuanf(val)
        },
    },
    components: {
        MusicTabletwo,
    },
};
</script>

<style lang="scss" scoped>
.hera {
    .popups {
        background-color: black;
        .loadingnamesTo {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100rem;
            height: 100rem;
            overflow: hidden;
            margin: auto;

            .loadingnames {
                text-align: center;
            }
        }
        .ssd {
            height: 100vh;
            overflow: scroll;
            .ground-color {
                background-color: black;
            }
            .nav-top {
                width: 100vw;
                height: 50rem;
                position: fixed;
                // background-color: red;

                display: flex;
                justify-content: space-between;
                color: #ccc;
                z-index: 30;
                .dianz1 {
                    padding: 0 20rem;
                    line-height: 50rem;
                    font-size: 25rem;
                }
                .dianz {
                    padding: 0 20rem;
                    line-height: 50rem;
                    font-size: 18rem;
                }
                .dianz2 {
                    padding: 0 20rem;
                    line-height: 50rem;
                    font-size: 18rem;
                    color: white;
                }
            }

            .main {
                width: 100vw;
                // height: 100vh;
                // background-color: aqua;

                .nav-img {
                    width: 100%;
                    height: 300rem;
                    // background-position: center;
                    background-size: cover;
                    // background-color: darkblue;
                    position: relative;
                    // background-position: ;

                    .nav-name {
                        width: 100%;
                        height: 100rem;
                        bottom: 0;
                        position: absolute;
                        background: linear-gradient(
                            180deg,
                            rgba(0, 0, 0, 0) 0,
                            rgba(0, 0, 0, 1) 100%
                        );

                        .nav-name-one {
                            width: 300rem;
                            font-size: 20rem;
                            font-weight: 600;
                            padding: 10rem 20rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: white;
                        }
                        .nav-name-two {
                            width: 300rem;
                            font-size: 14rem;
                            font-weight: 600;
                            padding: 0 20rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            color: rgb(255, 255, 255, 0.5);
                            white-space: nowrap;
                        }
                    }
                }
            }
            .main-seco {
                // margin: -20rem 0 0 0;
                width: 100%;
                height: 50rem;
                // background-color: red;
                display: flex;
                z-index: 9999;
                justify-content: space-between;

                .seco-img {
                    padding: 0 20rem;
                    display: flex;
                    align-items: center;
                    img {
                        width: 30rem;
                        height: 30rem;
                        border-radius: 50%;
                    }
                    .seco-tiname {
                        font-size: 16rem;
                        margin-left: 10rem;
                        color: white;
                    }
                }

                .seco-icon {
                    display: flex;
                    align-items: center;

                    .aixin {
                        padding: 0 10rem 0 0;
                        color: white;

                        .aixin-icon {
                            font-size: 30rem;
                        }
                        .col1 {
                            color: red;
                        }
                        .col2 {
                            color: rgb(255, 217, 29);
                        }

                        .aixin-num {
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>