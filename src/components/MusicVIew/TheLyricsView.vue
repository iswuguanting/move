<template>
    <!-- <transition name="lyric"> -->
    <!--  -->
    <div class="bosingssc " v-show="showTwo">
        <div class="lrc-nav">
            <img
                :src="songsData.al?.picUrl"
                alt=""
                v-lazy="songsData.al?.picUrl"
                @click="guanPicLrc"
            />
            <div class="lrc-name">
                <div>{{ songsData.name }}</div>
                <div>{{ songsData.ar ? songsData.ar[0].name : "" }}</div>
            </div>
            <div class="lrc-ico" @click="singplay">
                <van-icon
                    name="play-circle-o"
                    v-show="AudioPlayEndAbslo == false"
                />
                <van-icon
                    name="pause-circle-o"
                    v-show="AudioPlayEndAbslo == true"
                />
            </div>
        </div>

        <div class="lrc-geci" ref="lrcsc" @click="moanxia">
            <div class="geci-wei" ref="lrscsd">
                <!-- active -->
                <div
                    class="geci-name"
                    v-for="item in lrcs"
                    :key="item.time"
                    :class="{ active: timess == item.time.slice(0, 5) }"
                   
                >
                    {{ item.lrc }}
                </div>
            </div>
        </div>

        <div class="geci-to"></div>
        <div class="geci-foo"></div>
    </div>

    <!-- </transition> -->
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            timess: "",
            // 按下时5秒后开始滚动
            timeTi: true,
            // 清除空白的歌词
            lrcGe:[]
        };
    },
    computed: {
        ...mapState(["AudioPlayEndAbslo", "duratio", "canplyAudio"]),
    },
    props: {
        showTwo: {
            type: Boolean,
        },
        lrcs: {
            type: Array,
        },
        songsData: {
            type: Object,
        },
    },
    created() {
        
    },
    methods: {
        ...mapMutations(["AudioPlay", "RadioPlayEnd"]),
        singplay() {
            this.AudioPlay(!this.AudioPlayEndAbslo);
        },
        moanxia() {
            this.timeTi = false;
            console.log(this.timeTi);
            setTimeout(() => {
                this.timeTi = true;
                console.log(this.timeTi);
            }, 5000);
        },
      
        guanPicLrc(){
            console.log(123);
           this.$emit('showTwoNone' ,false)
        }
    },
    watch: {
        duratio() {
            // this.lrcscol(this.duratio)

            let time = Math.floor(this.duratio / 60); // 分钟
            time = time < 10 ? "0" + time : time;
            let time2 = Math.floor(this.duratio % 60); // 秒
            time2 = time2 < 10 ? "0" + time2 : time2;
            let time3 = time + ":" + time2;
            // console.log(time3);

            this.lrcs.filter((item, index) => {
                if (item.time.slice(0, 5) == time3) {
                    //  动画
                    // this.$refs.lrcsc.scrollTop = index * 53 + 53;
                    this.$refs.lrcsc.scrollTo({
                        top: index * 53 + 53,
                        behavior: "smooth",
                    });
                    // this.$refs.lrscsd.animate({ scrollTop: Slog.offsetTop }, 400);
                    this.timess = time3;
                }
            });

            // 循环歌词对象
        },
    },
};
</script>

<style lang="scss" scoped>
.bosingssc {
    width: 100vw;
    height: 100vh;
    background: darkblue;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    padding: 40rem 20rem;
    .lrc-nav {
        width: 100%;
        height: 100rem;
        background-color: skyblue;
        border-radius: 10rem;
        display: flex;
        align-items: center;
        img {
            width: 100rem;
            height: 100rem;
            border-radius: 10rem;
        }
        .lrc-name {
            margin-left: 20rem;

            div:nth-child(1) {
                font-size: 20rem;
                color: white;
                width: 150rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            div:nth-child(2) {
                font-size: 16rem;
                color: rgb(255, 255, 255, 0.5);
                width: 150rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .lrc-ico {
            font-size: 25rem;
            margin-left: 20rem;
            color: white;
        }
    }

    .lrc-geci {
        width: 100%;
        height: 480rem;
        margin-top: 20rem;
        // background-color: white;
        overflow: auto;
        position: relative;
        padding-top: 240rem;
        .geci-wei {
            width: 100%;
            overflow-x: hidden;
            overflow-y: scroll;

            .geci-name {
                width: 100%;
                height: 53rem;
                display: flex;
                align-items: center;
                // background-color: darkblue;
                font-size: 18rem;
                font-weight: 600;
                color: rgb(255, 255, 255, 0.5);
            }
            .active {
                color: white;
                font-size: 20rem;
            }
        }
    }

    .geci-to {
        position: absolute;
        top: 160rem;
        width: 100%;
        height: 100rem;
        background-image: linear-gradient(darkblue, transparent);
    }

    .geci-foo {
        position: absolute;
        bottom: 27rem;
        width: 100%;
        height: 100rem;
        background-image: linear-gradient(transparent, darkblue);
    }
}
.lrc-geci::-webkit-scrollbar {
    display: none;
}
@keyframes geci {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-53rem);
    }
    100% {
        transform: translateY(0);
    }
}
</style>