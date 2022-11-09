<template>
    <div class="main-music" ref="resd">
        <div class="music-eve">
            <div class="music-eve-one" @click="exit">
                <div class="music-play"><van-icon name="play-circle" /></div>
                <div class="music-num">
                    播放全部<span
                        >&nbsp;&nbsp;&nbsp;({{ axoDatamusic.length }})</span
                    >
                </div>
            </div>
            <div class="music-eve-two">
                <i class="wd-icon-download download"></i>
                <van-icon name="bars" />
            </div>
        </div>
        <div
            class="musicclo"
            v-for="(item, index) in axoDatamusic"
            :key="item.id"
            @click="Datamusic(item.id)"
           
        >
            <div class="musicclo-shuju" :class="{ musicaid: MusicId == item.id }">
                <div class="shuju-index">
                    <div class="index-end-name">
                        <div class="the-index" >{{ index + 1 }}</div>
                        <div class="the-name">
                            <div class="title-one">{{ item.name }}</div>
                            <div class="title-two">{{ item.ar[0].name }}</div>
                        </div>
                    </div>
                    <div class="index-icon">
                        <i class="wd-icon-more"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    props: {
        axoDatamusic: {
            type: Array,
        },
        thesearchId: {
            type: Number,
        },
    },
    data() {
        return {
            pageY: 0,
        };
    },
    computed: {
        ...mapState(["searchId", "searchShow", "MusicId"]),
    },
    methods: {
        ...mapMutations([
            "getDuratio",
            "getMusiclistOf",
            "searchShowend",
            "searchShowendtwo",
            "getMusicId",
            "AudioPlay",
        ]),
        exit() {
            console.log(this.axoDatamusic.length);
            this.$router.push({
                path: "/musicview",
            });
            this.getMusicId(this.axoDatamusic[0].id);
            this.getMusiclistOf(this.axoDatamusic);
            this.searchShowend(false);
            this.searchShowendtwo(false);
            this.getDuratio(0);
            this.AudioPlay(false);
            setTimeout(() => {
                this.AudioPlay(true);
            }, 1000);
        },
        Datamusic(id) {
            this.$router.push({
                path: "/musicview",
            });
            console.log(id);
            this.getMusicId(id);
            this.getMusiclistOf(this.axoDatamusic);
            this.searchShowend(false);
            this.searchShowendtwo(false);
            this.getDuratio(0);
            this.AudioPlay(false);
            setTimeout(() => {
                this.AudioPlay(true);
            }, 1000);
        },
    },
};
</script>

<style lang="scss" scoped>
.main-music {
    width: 100vw;
    // height: 100vh;
    // background: #fff;
    background-color: black;
    // color: pink;
    

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
    }
    .dis {
        display: none;
    }
    .music-eve {
        width: 100vw;
        height: 70rem;
        padding: 0 20rem;
        align-items: center;
        background: black;
        display: flex;
        justify-content: space-between;
        position: sticky;
        top: 50rem;
        z-index: 10;

        .music-eve-one {
            display: flex;
            // align-items: center;
            .music-play {
                color: #00cb64;
                border-radius: 50%;
                font-size: 30rem;
                position: relative;
                display: flex;
                align-items: center;
            }
            .music-play::before {
                content: "";
                position: absolute;
                width: 50%;
                height: 50%;
                left: 0;
                right: 0;
                margin: 0 auto;
                background-color: white;
            }
            span {
                font-size: 12rem;
                color: #ccc;
            }
            .music-num {
                font-size: 14em;
                margin: 0 0 0 10rem;
                display: flex;
                align-items: center;
                color: white;
            }
        }

        .music-eve-two {
            font-size: 20rem;
            color: #ccc;
            .download {
                margin-right: 20rem;
            }
        }
    }

    .musicclo {
        width: 100vw;
        // height: 596rem;
        // background-color: red;
        .musicaid {
            color: #00cb64 !important;
        }
        .musicclo-shuju {
            width: 100vw;
            height: 80rem;
            padding: 20rem;
            .shuju-index {
                width: 100%;
                height: 100%;
                // background-color: darkblue;
                display: flex;
                justify-content: space-between;

                .index-icon {
                    font-size: 20rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #ccc;
                }
                .index-end-name {
                    display: flex;
                    .the-index {
                        text-align: center;
                        padding: 0 20rem 0 0;
                        line-height: 40rem;
                        font-size: 16rem;
                        color: #ccc;
                    }
                    .the-name {
                        width: 200rem;
                        height: 100%;
                        // background-color: saddlebrown;

                        .title-one {
                            width: 200rem;
                            font-size: 16rem;
                            color: white;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .title-two {
                            width: 200rem;
                            font-size: 14rem;
                            color: rgb(255, 255, 255, 0.4);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
    }
}
</style>