<template>
    <div id="app">
        <div class="bods" v-show="!this.$route.meta.ShowAndHide">
            <keep-alive include="FoundView">
                <div
                    class="bods-on"
                    :class="{ active: active == 1 }"
                    @click="bosdsOne"
                >
                    <div class="bods-icon"><van-icon name="service-o" /></div>
                    <div class="bods-name">发现</div>
                </div>
            </keep-alive>

            <div class="bods-on" @click="bosdsTwo">
                <div class="bods-icon">
                    <div
                        class="icon-vid"
                        v-show="$store.state.AudioPlayEndAbslo == true"
                    >
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                    <div
                        class="icon-ad"
                        v-show="$store.state.AudioPlayEndAbslo == false"
                    >
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
                <div class="bods-name">音乐</div>
            </div>

            <div
                class="bods-on"
                :class="{ active: active == 3 }"
                @click="bosdsThree"
            >
                <div class="bods-icon"><van-icon name="contact" /></div>
                <div class="bods-name">我的</div>
            </div>
        </div>
        <transition name="fade">
            <keep-alive>
                <router-view
                    @setAudioCurrentTime="setAudioCurrentTime"
                    v-if="$route.meta.keepAlive"
                    v-show="$route.meta.shows"
                ></router-view>
            </keep-alive>
        </transition>
        <router-view
            @setAudioCurrentTime="setAudioCurrentTime"
            v-if="!$route.meta.keepAlive"
        ></router-view>
        <SingleTable />
        <SingleTabletwo />
        <SingleTabletwoThe/>
        <!-- 音乐播放 -->
        <audio
            :src="MusicLink"
            ref="audio"
            loop
            @canplay="canplay"
            @timeupdate="audioTimeupdate"
        ></audio>
    </div>
</template>

<script>
import SingleTable from "@/components/SingleTable.vue";
import SingleTabletwo from "@/components/SingleTabletwo.vue";
import SingleTabletwoThe from "@/components/SingleTabletwoThe.vue";

import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["AudioPlayEndAbslo", "canplyAudio", "MusicId"]),
        active() {
            return this.$store.state.active;
        },
        MusicLink() {
            return `https://music.163.com/song/media/outer/url?id=${this.MusicId}.mp3`;
        },
    },
    created() {
        this.getLocoData();
    },

    methods: {
        ...mapMutations([
            "duratio",
            "searchShowend",
            "getDuratio",
            "getCanplyAudio",
            "getsearchDataLoc",
            "gethistoryDataLoc"
        ]),

        // 提供音乐播放总时长
        canplay() {
            // console.log(this.$refs.audio.duration);
            this.getCanplyAudio(this.$refs.audio.duration);
        },
        // 提供音乐播放实时监听时长
        audioTimeupdate() {
            this.getDuratio(this.$refs.audio.currentTime);
            // console.log(this.$refs.audio.currentTime);
            // this.$refs.audio.currentTime = this.duratio
        },

        bosdsOne() {
            this.$store.commit("highlightedActive", 1);
            this.$router.push("/foundview");
            this.searchShowend(false);
            console.log(this.$route);
        },
        bosdsTwo() {
            this.$router.push("/musicview");
        },
        bosdsThree() {
            this.$store.commit("highlightedActive", 3);
            this.$router.push("/myview");
        },

        setAudioCurrentTime(cs) {
            console.log(cs);
            this.$refs.audio.currentTime = cs;
        },
        // 创建locstorage
        getLocoData() {
            if (localStorage.getItem("locoData") == null) {
                localStorage.setItem("locoData", JSON.stringify([]));
            }
            if (localStorage.getItem("logintoken") == null) {
                localStorage.setItem("logintoken", JSON.stringify([{}]));
            }
            if (localStorage.getItem("locoData") != null) {
                let locoData = JSON.parse(localStorage.getItem("locoData"));
                this.getsearchDataLoc(locoData);
            }
            if (localStorage.getItem("lcosongs") == null) {
                localStorage.setItem("lcosongs", JSON.stringify([]));
            }
            if (localStorage.getItem("lcosongs") != null) {
                let gethistoryData = JSON.parse(
                    localStorage.getItem("lcosongs")
                );
                this.gethistoryDataLoc(gethistoryData);
            }
        },
    },
    components: {
        SingleTable,
        SingleTabletwo,
        SingleTabletwoThe
    },
    watch: {
        AudioPlayEndAbslo(newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal) {
                    // 播放歌曲
                    this.$refs.audio.play();
                } else {
                    // 暂停歌曲
                    this.$refs.audio.pause();
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.bods {
    width: 100vw;
    height: 50rem;
    position: fixed;
    display: flex;
    justify-content: space-around;
    bottom: 0;
    padding: 5rem 0;
    background-color: #121212;
    z-index: 999;
    color: #656565;

    .active {
        color: white;
    }

    .bods-on {
        width: 15%;
        height: 100%;
        text-align: center;

        .bods-icon {
            width: 100%;
            height: 60%;
            line-height: 30rem;
            font-size: 24rem;

            .icon-vid {
                width: 100%;
                height: 100%;
                padding: 0 10rem;
                display: flex;
                justify-content: space-around;
                align-items: center;

                i {
                    width: 5rem;
                    height: 5rem;
                    background-color: #656565;
                    border-radius: 1rem;

                    &:nth-child(1) {
                        animation: scaleI 1.5s linear infinite;
                    }

                    &:nth-child(2) {
                        animation: scaleI 1.5s linear 0.5s infinite;
                    }

                    &:nth-child(3) {
                        animation: scaleI 1.5s linear 1s infinite;
                    }
                }
            }

            .icon-ad {
                width: 100%;
                height: 100%;
                padding: 0 10rem;
                display: flex;
                justify-content: space-around;
                align-items: center;

                i {
                    width: 5rem;
                    height: 5rem;
                    background-color: #656565;
                }
            }
        }

        .bods-name {
            width: 100%;
            height: 40%;
            line-height: 20rem;
        }
    }
}
@keyframes scaleI {
    0% {
        transform: scaleY(0.8);
    }

    50% {
        transform: scaleY(3);
    }

    100% {
        transform: scaleY(0.8);
    }
}

.fade-enter {
    transform: translateX(100%);
}
.fade-enter-active {
    transition: all 0.3s linear;
}
.fade-enter-to {
    transform: translateX(0);
}

.fadess-leave {
    opacity: 1;
}

.fadess-leave-active {
    transition: all 5s linear;
}

.fadess-leave-to {
    opacity: 0.9;
}
</style>