<template>
    <div class="bosing-maintwo">
        <div class="nav-name">歌单推荐</div>
        <div class="main-scorll">
            <div class="scorll-on">
                <div class="on-first" v-for="item in datas" :key="item.id" @click="gosearch(item.id)">
                    <div class="first-name">
                        <div class="img-one">
                            <img
                                :src="item.picUrl"
                                alt=""
                                v-lazy="item.picUrl"
                            />
                        </div>
                        <div class="name-two">
                            {{item.name}}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    props:{
        PlaylistData:Array
    },
    computed:{
        datas(){
            return this.PlaylistData
        }
    },
    methods: {
      ...mapMutations(["searchShowendtwo", "searchIdendtwo"]),

         gosearch(id){
            console.log('ss');
            console.log(id)
            // 修改专辑id 和 控制显示和隐藏
            this.searchIdendtwo(id)
            this.searchShowendtwo(true);
        }
    },
};
</script>

<style lang="scss" scoped>
.bosing-maintwo {
    width: 100vw;
    // 到时候要注释  height: 100vh;
    // height: 100vh;
    background-color: #121212;

    .nav-name {
        height: 30rem;
        // background-color: darkblue;
        color: white;
        font-size: 14rem;
        padding-left: 10rem;
    }

    .main-scorll {
        width: 100vw;
        height: 344rem;
        // background-color: fuchsia;
        overflow-x: scroll;
        overflow-y: hidden;
        padding-left: 5rem;

        .scorll-on {
            width: 225vw;
            height: 170rem;

            .on-first {
                width: 130rem;
                height: 160rem;
                // background-color: #3585cf;   
                margin: 5rem;
                float: left;
                overflow: hidden;
                border-radius: 5rem;
                position: relative;

                .first-name {
                    // margin: 10rem 0 0 10rem;
                    color: #e1edf8;
                }

                img {
                    width: 100%;
                    height: 120rem;
                    /* margin: 10rem 0 0 65rem; */
                    /* box-shadow: 0 0 10rem rgb(0 0 0 / 31%); */
                    border-radius: 5rem;
                }
                .name-two {
                    height: 35rem;
                    transform: scale(0.8);
                    margin-left: -13rem;
                    line-height: 18rem;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    display: -webkit-box;
                }

                .first-don {
                    width: 100%;
                    height: 20rem;
                    // background-color: white;
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