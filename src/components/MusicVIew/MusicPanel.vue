<template>
    <div>
        <keep-alive>
            <div class="music-main">
                <div class="search">
                    <div class="search-one">推荐</div>
                    <div class="search-two" @click="thlrcsshow">
                        {{ lrcsIndex }}
                    </div>
                    <div class="search-icon" @click="getsearchs">
                        <van-icon name="search" />
                    </div>
                </div>
                <van-swipe
                    style="height: 100vh"
                    vertical
                    :loop="false"
                    :duration="plsytime"
                    :show-indicators="false"
                    @change="onChange"
                    ref="swiper"
                >
                    <van-swipe-item v-for="item in MusiclistOf" :key="item.id">
                        <div class="ma-top">
                            <div class="main-top">
                                <!-- 这个地方背景图的img要一行 -->
                                <div class="main-bacimg">
                                    <img
                                        :src="songsData.al?.picUrl"
                                        alt=""
                                        v-lazy="songsData.al?.picUrl"
                                    />
                                </div>
                            </div>
                            <div class="main-projact">
                                <div class="sing-pic">
                                    <img
                                        :src="songsData.al?.picUrl"
                                        alt=""
                                        v-lazy="songsData.al?.picUrl"
                                    />
                                </div>
                                <div class="lyrcs">{{ duraioss }}</div>
                                <div class="lyrcs-name">
                                    <div class="lyrcs-name-on">
                                        {{ songsData.name }}
                                    </div>
                                    <div class="lyrcs-name-tw">
                                        <!-- 这里报错，在页面没渲染之前就触发了，不影响 ar[0]-->
                                        {{
                                            songsData.ar
                                                ? songsData.ar[0].name
                                                : ""
                                        }}<span class="lyrcs-name-th"
                                            >关注</span
                                        >
                                    </div>
                                </div>
                                <div class="aixion">
                                    <div class="aixion-le">
                                        <div class="le-ons" @click="aixigao">
                                            <van-icon
                                                name="like"
                                                :class="{
                                                    col1: aiLove == MusicId,
                                                }"
                                            />
                                            <div class="le-ids">
                                                {{ aixin }}
                                            </div>
                                        </div>
                                        <div class="le-ons">
                                            <van-icon name="comment" />
                                            <div class="le-ids">
                                                {{ pinlun }}
                                            </div>
                                        </div>
                                        <div class="le-ons" @click="leOns">
                                            <van-icon name="share" />
                                            <div class="le-ids">
                                                {{ songsData.dt }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="aixion-ri">
                                        <div
                                            class="ri-ons"
                                            @click="riOnsLiebiao"
                                        >
                                            <van-icon name="bars" />
                                        </div>
                                        <div class="ri-ons">
                                            <i class="wd-icon-more"></i>
                                        </div>
                                    </div>
                                </div>

                                <div class="jindut">
                                    <span>{{ duraio }}</span>
                                    <van-slider
                                        v-model="value"
                                        inactive-color="rgb(90, 90, 90)"
                                        active-color="white"
                                    />
                                    <span>{{ canplyAudioTime }}</span>
                                </div>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
                <van-share-sheet
                    v-model="showShare"
                    title="立即分享给好友"
                    :options="options"
                />
                <MusicPlanelFoo
                    :shows="shows"
                    :MusiclistOf="MusiclistOf"
                    @showdo="showdo"
                />
                <TheLyricsView
                    :showTwo="showTwo"
                    :songsData="songsData"
                    :lrcs="lrcs"
                    @showTwoNone="showTwoNone"
                />
            </div>
        </keep-alive>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MusicPlanelFoo from "./MusicPlanelFoo.vue";
import TheLyricsView from "./TheLyricsView.vue";
export default {
    data() {
        return {
            pageY: 0,
            // 评论
            pinlun: 0,
            // 歌词
            lrcs: [],
            // 歌词高亮的
            lrcsIndex: "",
            // 详细
            songsData: {},
            // 歌词id
            lrcsId: "",
            showShare: false,
            options: [
                [
                    { name: "微信", icon: "wechat" },
                    { name: "朋友圈", icon: "wechat-moments" },
                    { name: "微博", icon: "weibo" },
                    { name: "QQ", icon: "qq" },
                ],
                [
                    { name: "复制链接", icon: "link" },
                    { name: "分享海报", icon: "poster" },
                    { name: "二维码", icon: "qrcode" },
                    { name: "小程序码", icon: "weapp-qrcode" },
                ],
            ],
            // 爱心
            // 判断爱心
            aixin: 10265,
            aixinMath: [],
            // 判断爱心
            aiLove: false,

            plsytime: 500,

            //下拉列表
            shows: false,
            // 歌词显示隐藏
            showTwo: false,
        };
    },
    created() {
        this.MusicDetails(this.MusicId);
        this.aixhezhuanf(this.MusicId);
    },
    computed: {
        ...mapState([
            "duratio",
            "canplyAudio",
            "MusiclistOf",
            "MusicId",
            "historyDataLoc",
            "searchId",
            "searchShow",
            "playIndex",
        ]),

        duraio() {
            return this.radioTime(this.duratio);
        },
        canplyAudioTime() {
            return this.radioTime(this.canplyAudio);
        },
        // 歌曲显示当前唱的内容
        duraioss() {
            return this.duraiossTime(this.duraio);
        },

        // 修改音乐进度条
        value: {
            get() {
                return (this.duratio / this.canplyAudio) * 100;
            },
            set(value) {
                let currentTime = (value / 100) * this.canplyAudio;
                this.$emit("setAudioCurrentTime", currentTime);
            },
        },
    },
    methods: {
        ...mapMutations([
            "getDuratio",
            "getCanplyAudio",
            "getMusicId",
            "AudioPlay",
            "gethistoryDataLoc",
            "getplayIndex",
        ]),

        showTwoNone(opt) {
            this.showTwo = opt;
        },

        showdo() {
            this.shows = false;
        },

        // 歌曲显示当前唱的内容和列表
        riOnsLiebiao() {
            console.log("ddd");
            this.shows = !this.shows;
        },

        // 爱心高亮
        aixigao() {
            // linkMath没有this.searchId时push进去
            if (this.aixinMath.indexOf(this.MusicId) == -1) {
                this.aixinMath.push(this.MusicId);
                localStorage.setItem(
                    "aixinMath",
                    JSON.stringify(this.aixinMath)
                );
                // 如果this.aixin有万字就不添加
                this.aixin = this.aixin + 1;

                this.aiLove = this.MusicId;
            } else {
                this.aixinMath.splice(this.aixinMath.indexOf(this.MusicId), 1);
                localStorage.setItem(
                    "aixinMath",
                    JSON.stringify(this.aixinMath)
                );
                this.aixin = this.aixin - 1;
                this.aiLove = "";
            }
            localStorage.setItem("aixinGao", JSON.stringify(this.aixinMath));
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
        },

        leOns() {
            this.showShare = !this.showShare;
        },
        // 歌词的显示隐藏
        thlrcsshow() {
            this.showTwo = !this.showTwo;
        },

        getsearchs() {
            this.$router.push({ path: "/search" });
        },

        // 滚动高度
        handscoll() {
            let resd = Math.floor(
                document.documentElement.scrollTop || document.body.scrollTop
            );
            // console.log(this.pageY);
            this.pageY = resd;
        },

        // 歌曲播放到和duratio一样时间时显示
        duraiossTime(ti) {
            this.lrcs.filter((item) => {
                if (item.time.slice(0, 5) == ti) {
                    this.lrcsIndex = item.lrc;
                    return item.lrc;
                }
            });
        },

        // 时间转换
        radioTime(time) {
            let times = Math.floor(time);
            let min = Math.floor(times / 60);
            let sec = times % 60;
            return `${min < 10 ? "0" + min : min}:${
                sec < 10 ? "0" + sec : sec
            }`;
        },
        // 轮播图索引
        onChange(index) {
            // Toast("当前 Swipe 索引：" + index);
            // console.log(index);
            // console.log(this.MusiclistOf);
            // getMusicId
            // MusiclistOf
            // 添加部分数据，要不然报错
            this.getplayIndex(index);
            this.getMusicId(this.MusiclistOf[index].id);
            this.AudioPlay(false);
            setTimeout(() => {
                this.AudioPlay(true);
            }, 1000);
        },

        // 获取音乐详情，包括歌词，评论，歌曲信息
        // 歌词
        // https://apis.netstart.cn/music/lyric?id=1970559918
        // 详情
        // https://apis.netstart.cn/music/song/detail?ids=1970559918
        // 评论
        // https://apis.netstart.cn/music/comment/music?id=1970559918
        MusicDetails(ids) {
            // console.log(ids);

            // 获取歌手的歌听过的人

            // 歌词
            this.$axios
                .get(`/lyric`, {
                    params: {
                        id: ids,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    let lrctys = res.lrc.lyric.split("\n");
                    lrctys = lrctys.map((item) => {
                        let arr = item.split("]");
                        return {
                            time: arr[0].slice(1),
                            lrc: arr[1],
                        };
                    });
                    lrctys.map((item) => {
                        if (item.lrc != "") {
                            // console.log(item.lrc);
                            this.lrcs.push(item);
                        }
                    });

                    console.log("this.lrcs", this.lrcs);
                });
            // 详情
            this.$axios
                .get(`/song/detail`, {
                    params: {
                        ids: ids,
                    },
                })
                .then((res) => {
                    this.songsData = res.songs[0];
                    this.aixin = res.songs[0].cp;
                    console.log(this.songsData, 123);
                    // 为了给历史数据添加部分数据
                    let lcosongss = JSON.parse(
                        localStorage.getItem("lcosongs")
                    );
                    console.log(lcosongss);
                    let str1 = {
                        id: res.songs[0].id,
                        name: res.songs[0].name,
                        singname: res.songs[0].ar[0].name,
                        picUrl: res.songs[0].al.picUrl,
                    };
                    // 判断数组没有这个对象
                    if (lcosongss.length > 0) {
                        let index = lcosongss.findIndex((item) => {
                            return item.id == str1.id;
                        });
                        if (index == -1) {
                            lcosongss.push(str1);
                            this.gethistoryDataLoc(lcosongss);
                            localStorage.setItem(
                                "lcosongs",
                                JSON.stringify(lcosongss)
                            );
                        }
                    } else {
                        lcosongss.push(str1);
                        this.gethistoryDataLoc(lcosongss);
                        localStorage.setItem(
                            "lcosongs",
                            JSON.stringify(lcosongss)
                        );
                    }
                    // if (lcosongss.indexOf(str1) == -1) {
                    //     lcosongss.push(str1);
                    //     this.gethistoryDataLoc(lcosongss);
                    //     localStorage.setItem(
                    //         "historyDataLoc",
                    //         JSON.stringify(lcosongss)
                    //     );
                    // }
                });
            // 评论
            this.$axios
                .get(`/comment/music`, {
                    params: {
                        id: ids,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    this.pinlun = res.total;
                });

            this.aixhezhuanf(ids);
        },
    },
    mounted() {
        window.addEventListener("scroll", this.handscoll);
        // this.plsytime = 0;
        this.MusiclistOf.filter((item, index) => {
            if (item.id == this.MusicId) {
                this.$refs.swiper.swipeTo(index);
            }
        });
    },
    watch: {
        MusicId: function (val) {
            // console.log(val);
            this.MusicDetails(val);
            this.aixhezhuanf(val);
        },
    },
    components: {
        MusicPlanelFoo,
        TheLyricsView,
    },
};
</script>

<style lang="scss" scoped>
.music-main {
    width: 100vw;
    height: 100vh;
    // background-color: darkblue;
    // overflow: auto;
    .search {
        width: 100vw;
        height: 50rem;
        position: fixed;
        display: flex;
        justify-content: space-between;
        padding: 20rem 20rem 10rem 20rem;
        z-index: 100;

        .search-one {
            color: white;
            font-size: 16rem;
            font-weight: 600;
        }
        .search-two {
            color: white;
            font-size: 16rem;
            font-weight: 600;
            width: 255rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
        }
        .search-icon {
            color: white;
            font-size: 20rem;
        }
    }

    .ma-top {
        position: relative;
        width: 100vw;

        .main-top {
            width: 100%;
            height: 100%;

            .bac {
                background-color: black;
            }
            .bac2 {
                background-color: rgb(0, 0, 0, 0.5);
            }
        }

        .main-bacimg {
            width: 100vw;
            height: 100vh;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            filter: blur(60px);
            // -webkit-filter: blur(60px);
            overflow: hidden;
            position: fixed;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .main-projact {
            width: 100%;
            // height: 500rem;
            // background-color: red;
            position: absolute;
            padding: 80rem 20rem 0;

            .sing-pic {
                width: 100%;
                height: 350rem;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 20rem;
                }
            }
            .lyrcs {
                width: 100%;
                margin: 20rem 0;
                font-size: 18rem;
                // height: 50rem;
                color: #c6c2c0;
            }
            .lyrcs-name {
                .lyrcs-name-on {
                    width: 200rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 20rem;
                    color: white;
                }
                .lyrcs-name-tw {
                    font-size: 14rem;
                    color: #c6c2c0;

                    .lyrcs-name-th {
                        padding: 3rem;
                        margin-left: 10rem;
                        border-radius: 10rem;
                        font-size: 12rem;
                        background-color: #848484;
                    }
                }
            }

            .aixion {
                width: 100%;
                height: 50rem;
                // background-color: #848484;
                display: flex;
                justify-content: space-between;

                .aixion-le {
                    font-size: 28rem;
                    display: flex;
                    align-items: center;
                    .le-ons {
                        display: flex;
                        margin-right: 10rem;
                        color: white;

                        .col1 {
                            color: red;
                        }
                    }
                    .le-ids {
                        font-size: 12rem;
                        margin-top: 0px;
                    }
                }
                .aixion-ri {
                    font-size: 20rem;
                    display: flex;
                    align-items: center;
                    color: white;
                    .ri-ons {
                        margin-left: 20rem;
                    }
                }
            }

            .jindut {
                display: flex;
                align-items: center;
                margin: 10rem 0 0 0;
                span {
                    margin: 0 10rem;
                }
            }
        }
    }
}

.fadess-enter,
.fadess-leave-to {
    transform: translateY(100%);
}

.fadess-enter-active,
.fadess-leave-active {
    transition: all 0.3s linear;
}

.fadess-enter-to,
.fadess-leave-from {
    transform: translateY(0);
}
</style>