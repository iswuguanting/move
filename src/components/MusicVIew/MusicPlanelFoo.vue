<template>  
    <transition name="fadess">
        <div class="bsoxos" v-show="shows">
            <!-- 导航 -->
            <div class="boxs">
                <div class="boxs-le">播放列表</div>
                <div class="boxs-ri" @click="showdo">
                    <van-icon name="cross" />
                </div>
            </div>
            <!-- 内容 -->
            <div class="Historical-play">
                <div class="tach-cont" v-for="item in MusiclistOf" :key="item.id" @click="contId(item.id)">
                    <div class="cont-img">
                        <img :src="item.al != undefined ? item.al.picUrl : item.artists[0].img1v1Url " alt=""  />
                    </div>
                    <div class="cont-name">
                        <div class="name-one">
                            {{item.name!= undefined ? item.name : item.artists[0].name}}
                           
                        </div>
                        <div class="name-two">
                            {{item.ar != undefined ? item.name : item.artists[0].name}}
                       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    data() {
        return {};
    },

    props: {
        shows: {
            type: Boolean,
        },
        MusiclistOf: {
            type: Array,
        },
    },
    created() {
        console.log(this.MusiclistOf,'5555555555555555');
    
    },
    methods: {
        ...mapMutations(["getMusicId","AudioPlay"]),
        showdo() {
            this.$emit("showdo", false);
        },
        contId(id){
            console.log(id);
            this.getMusicId(id);
            this.$emit("showdo", false);
            this.AudioPlay(false);
            setTimeout(() => {
                this.AudioPlay(true);
            }, 1000);
        }
    },
    

};
</script>

<style lang="scss" scoped>
.bsoxos {
    width: 100vw;
    height: 60vh;
    background: #121212;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top-left-radius: 20rem;
    border-top-right-radius: 20rem;
    .boxs {
        width: 100%;
        height: 50rem;
        border-top-left-radius: 20rem;
        border-top-right-radius: 20rem;
        // background-color: saddlebrown;
        position: relative;

        .boxs-le {
            position: absolute;
            line-height: 50rem;
            left: 0;
            right: 0;
            margin: 0 auto;
            font-size: 20rem;
            color: white;
            text-align: center;
        }
        .boxs-ri {
            position: absolute;
            font-size: 20rem;
            color: white;
            right: 20rem;
            line-height: 50rem;
        }
    }

    .Historical-play {
        height: 45vh;
        // background-color: aqua;
        padding: 20rem 0;
        overflow-y: scroll;
        overflow-x: hidden;

        .playsc {
            color: white;
            display: flex;
            justify-content: space-between;
            padding: 10rem 20rem;
        }

        .tach-cont {
            width: 100%;
            height: 80rem;
            background-color: rgb(255, 255, 255, 0.1);
            border-radius: 10rem;
            padding: 10rem 20rem;
            display: flex;
            margin: 10rem 0;
            .cont-img {
                width: 60rem;
                height: 60rem;
                // background-color: #ccc;
                margin-right: 30rem;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 10rem;
                }
            }
            .cont-name {
                width: 200rem;
                height: 60rem;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .name-one {
                    width: 100%;
                    height: 30rem;
                    font-size: 16rem;
                    color: white;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 30rem;
                }
                .name-two {
                    width: 100%;
                    height: 30rem;
                    font-size: 14rem;
                    color: #ccc;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 30rem;
                }
            }
        }
    }
}
</style>