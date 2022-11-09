<template>
    <div class="Historical-play">
        <div class="playsc">
            <div>全部内容</div>
            <div @click="shanply">删除</div>
        </div>
        <div
            class="tach-cont"
            v-for="item in historyDataLoc"
            :key="item.id"
            @click="Datamusic(item.id)"
        >
            <div class="cont-img">
                <img :src="item.picUrl" alt="" />
            </div>
            <div class="cont-name">
                <div class="name-one">
                    {{ item.name }}
                </div>
                <div class="name-two">
                    {{ item.singname }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["historyDataLoc"]),
    },

    methods: {
        ...mapMutations([
            "getsearchDataLoc",
            "getDuratio",
            "getMusiclistOf",
            "searchShowend",
            "searchShowendtwo",
            "getMusicId",
            "AudioPlay",
            "gethistoryDataLoc"
        ]),

        Datamusic(id) {
            this.$router.push({
                path: "/musicview",
            });
            console.log(id);
            this.getMusicId(id);
            this.getMusiclistOf(this.historyDataLoc);
            this.searchShowend(false);
            this.searchShowendtwo(false);
            this.getDuratio(0);
            this.AudioPlay(false);
            setTimeout(() => {
                this.AudioPlay(true);
            }, 1000);
        },

        shanply() {
            Dialog.confirm({
                title: "提示",
                message: "确定删除全部历史记录吗？",
            })
                .then(() => {
                    // console.log(321);
                    localStorage.setItem("lcosongs", JSON.stringify([]));
                    this.gethistoryDataLoc([]);
                })
                .catch(() => {
                    // on cancel
                    // console.log(123);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.Historical-play {
    height: 87vh;
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
</style>