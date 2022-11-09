<template>
    <div class="footaba">
        <div class="bods-on" @click="putfound">
            <div class="bods-icon"><van-icon name="service-o" /></div>
            <div class="bods-name">发现</div>
        </div>

        <div class="plaucon" @click="OpenMusicPlayback">
            <van-icon
                name="play-circle-o"
                class="play-circle"
                v-show="musicplay == false"
            />
            <van-icon
                name="pause-circle-o"
                class="play-circle"
                v-show="musicplay == true"
            />
        </div>

        <div class="bods-on" @click="putmy">
            <div class="bods-icon"><van-icon name="contact" /></div>
            <div class="bods-name">我的</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["AudioPlayEndAbslo"]),
        active() {
            return this.$store.state.active;
        },
        musicplay() {
            return this.$store.state.AudioPlayEndAbslo;
        },
    },
    methods: {
        ...mapMutations(["AudioPlay", "RadioPlayEnd"]),
        putfound() {
            this.$store.commit("highlightedActive", 1);
            this.$router.push("/foundview");
        },
        putmy() {
            this.$store.commit("highlightedActive", 3);
            this.$router.push("/myview");
        },

        // 开启音乐播放暂停电台播放
        OpenMusicPlayback() {

            this.RadioPlayEnd(false)
            if (this.AudioPlayEndAbslo == true) {
                this.AudioPlay(false);
            } else {
                this.AudioPlay(true);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.footaba {
    width: 100vw;
    height: 50rem;
    // background-color: rgb(233, 40, 40);
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    padding: 5rem 0;
    z-index: 100;

    .bods-on {
        width: 15%;
        height: 100%;
        text-align: center;
        color: #e6e6e6;

        .bods-icon {
            width: 100%;
            height: 60%;
            line-height: 30rem;
            font-size: 24rem;
        }

        .bods-name {
            width: 100%;
            height: 40%;
            line-height: 20rem;
        }
    }

    .plaucon {
        width: 15%;
        height: 100%;
        text-align: center;
        line-height: 50rem;

        .play-circle {
            font-size: 40rem;
            color: white;
        }
    }
}
</style>