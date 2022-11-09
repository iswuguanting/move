<template>
    <div class="nav">
        <div class="nav-name">新碟</div>

        <!-- 新碟上架 -->
        <div class="new-disc">
            <div class="dsic-bor">
                <!-- 第一个 -->
                <div
                    class="bor-box"
                    v-for="item in newDiscData"
                    :key="item.id"
                    @click="gosearch(item.id)"
                >
                    <div class="dsic-bor-img">
                        <img :src="item.blurPicUrl" v-lazy="item.blurPicUrl"/>
                    </div>
                    <div class="dsic-bor-span">
                        <div class="span-one">{{ item.name }}</div>
                        <div class="span-two">{{ item.singname }}</div>
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
            newDiscData: [],
        };
    },
    created() {
        this.newDiscAxios();
    },
    methods: {
        ...mapMutations(["searchIdend","searchShowend"]),
        newDiscAxios() {
            this.$axios.get("/album/newest").then((res) => {
                console.log("新碟上架", res);
                this.newDiscData = res.albums.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        blurPicUrl: item.blurPicUrl,
                        singname: item.artist.name,
                    };
                });
            });
        },
        gosearch(id){
            console.log('ss');
            console.log(id)
            // 修改专辑id 和 控制显示和隐藏
            this.searchIdend(id)
            this.searchShowend(true);
        }
    },
};
</script>

<style lang="scss" scoped>
.nav {
    width: 100vw;
    // height: 100vh;
    // background-color: red;
    color: white;

    .nav-name {
        // height: 30rem;
        // background-color: darkblue;
        color: white;
        font-size: 14rem;
        margin: 20rem 0 0 10rem;
    }

    .new-disc {
        // width: 100vw;
        height: 185rem;
        // background-color: rgb(55, 255, 178);
        padding: 10rem 5rem;
        overflow-x: scroll;
        overflow-y: hidden;
        display: flex;

        .dsic-bor {
            // width: 100vw;
            height: 100%;
            // background-color: rgb(255, 255, 255);
            display: flex;

            .bor-box {
                width: 130rem;
                height: 100%;
                margin: 0 5rem;
                // background-color: saddlebrown;
                // padding: 10rem;

                .dsic-bor-img {
                    width: 130rem;
                    height: 120rem;
                    // background-color: rgb(166, 24, 24);

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 5rem;
                    }
                }

                .dsic-bor-span {
                    font-size: 12rem;
                    transform: scale(0.8);
                    margin: 0 0 0 -15rem;
                    // text-align: center;

                    div {
                        margin: 3rem 0;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    .new-disc::-webkit-scrollbar {
        display: none;
    }
}
</style>