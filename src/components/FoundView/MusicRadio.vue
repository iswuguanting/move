<template>
    <div>
        <van-pull-refresh
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="onRefresh"
        >
            <div @scroll="adds" ref="scradds">
                <div class="bosing-main">
                    <div class="nav-name">音乐电台</div>
                    <div class="main-scorll">
                        <div class="scorll-on">
                            <div
                                class="on-first"
                                v-for="item in musicData"
                                :key="item.id"
                                :style="{ 'background-color': item.color }"
                                @click="bofandiantai(item)"
                            >
                                <div class="first-name">{{ item.name }}</div>
                                <img :src="item.img" v-lazy="item.img"/>
                                <div
                                    class="first-don"
                                    v-show="
                                        item.id == RadioId &&
                                        RadioPlayEndAbslo == true
                                    "
                                >
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <NewDiscShelves />

                <PlaylistRecommended :PlaylistData="PlaylistData" />
            </div>
        </van-pull-refresh>
       
    </div>
</template>

<script>
import radio from "@/apis/radio.js";
import { mapState, mapMutations } from "vuex";
import NewDiscShelves from "./NewDiscShelves.vue";
import PlaylistRecommended from "./PlaylistRecommended.vue";



export default {
    data() {
        return {
            dansing: 0,
            musicData: [],
            isLoading: false,
            // 歌单推荐
            PlaylistData: [],
        };
    },
    computed: {
        ...mapState(["RadioId", "RadioPlayEndAbslo"]),

        radiomusic() {
            return radio;
        },
    },
    created() {
        // console.log(this.radiomusic);
        // console.log('RadioId', this.RadioId);
        this.putmusic();
        this.Playlist();
    },
    methods: {
        ...mapMutations(["getsearchShowthree","searchIdendtwo","searchIdend","searchShowend","gethomecolor","thisRadioId", "AudioPlay", "RadioPlayEnd"]),

        adds() {
            console.log("object");
            console.log(this.$refs.scradds);
        },

        putmusic() {
            // 打乱radiomusic数组
            this.musicData = this.radiomusic.sort(function () {
                return Math.random() - 0.5;
            });

            // console.log(this.musicData);

            this.$emit("putmusic", this.musicData[0]);
            localStorage.setItem('loc', JSON.stringify(this.musicData[0].color));
        },

        // 刷新页面
        onRefresh() {
            setTimeout(() => {
                // Toast('刷新成功');
                this.isLoading = false;
                this.putmusic();
                this.Playlist();
            }, 1000);
        },

        // https://apis.netstart.cn/music/personalized?limit=12
        // 歌单推荐请求
        Playlist() {
            this.$axios.get("/personalized").then((res) => {
                console.log("res", res);

                // 打乱res.result
                this.PlaylistData = res.result.sort(function () {
                    return Math.random() - 0.5;
                });
            });
            //  this.$axios.get("/playlist/detail",{
            //     params:{
            //         id:149367827
            //     }
            // }).then(res => {
            //     console.log(res);
            // })
        },

        // 音乐电台播放停止音乐播放器
        bofandiantai(item) {
            // console.log(item);
            this.searchIdendtwo(item.id);
            this.getsearchShowthree(true);
        },
    },

    components: {
        NewDiscShelves,
        PlaylistRecommended,

    },
};
</script>

<style lang="scss" scoped>
.bosing-main {
    width: 100vw;
    // 到时候要注释  height: 100vh;
    // height: 100vh;
    // background-color: red;
    padding-top: 70rem;

    .nav-name {
        height: 30rem;
        // background-color: darkblue;
        color: white;
        font-size: 14rem;
        padding-left: 10rem;
    }

    .main-scorll {
        width: 100vw;
        height: 180rem;
        // background-color: fuchsia;
        overflow-x: scroll;
        overflow-y: hidden;
        padding-left: 5rem;

        .scorll-on {
            width: 263vw;
            height: 100rem;

            .on-first {
                width: 130rem;
                height: 80rem;
                // background-color: #3585cf;
                margin: 5rem;
                float: left;
                overflow: hidden;
                border-radius: 5rem;
                position: relative;

                .first-name {
                    margin: 10rem 0 0 10rem;
                    color: #e1edf8;
                }

                img {
                    width: 100rem;
                    height: 60rem;
                    transform: rotateZ(40deg);
                    margin: 10rem 0 0 65rem;
                    box-shadow: 0 0 10rem #0000004f;
                    border-radius: 2rem;
                }

                .first-don {
                    width: 100%;
                    height: 20rem;
                    // background-color: #e1edf8;
                    position: absolute;
                    display: flex;
                    align-items: center;
                    z-index: 999;
                    bottom: 0;
                    left: 15rem;
                    i {
                        width: 2rem;
                        height: 3rem;
                        margin-left: 2rem;
                        background-color: #e1edf8;

                        &:nth-child(1) {
                            animation: besmall 2s linear infinite;
                        }

                        &:nth-child(2) {
                            animation: besmall 2s linear 0.65s infinite;
                        }

                        &:nth-child(3) {
                            animation: besmall 2s linear 1.2s infinite;
                        }
                    }
                }
            }
        }
        .scorll-on::after {
            clear: both;
            display: block;
            content: "";
        }
    }
    .main-scorll::-webkit-scrollbar {
        display: none;
    }
}
@keyframes besmall {
    0% {
        transform: scaleY(1.8);
    }
    50% {
        transform: scaleY(0.5);
    }
    100% {
        transform: scaleY(1.8);
    }
}
</style>