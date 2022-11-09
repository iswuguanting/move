<template>
    <div class="boxing">
        <div class="loadingss">
            <van-loading
                color="#1989fa"
                v-show="loadingas != songName"
                size="300px"
                class="loadingss"
            />
        </div>
        <div class="bosing-nav">
            <div class="search-one" @click="rotergo">
                <van-icon name="arrow-left" />
            </div>
            <div class="search-icon">
                <div class="icon-one">
                    <van-icon name="search" />
                </div>
                <div class="icon-two">
                    <input
                        type="search"
                        placeholder="歌手、歌曲或专辑名"
                        ref="inps"
                        @input="getinput"
                        @keydown.enter="rotergoas"
                    />
                </div>
            </div>
        </div>

        <div class="main-tach" v-show="songDataname == songName">
            <div class="tach-cont" v-for="item in songData" :key="item.id"  @click="Datamusic(item.id)">
                <div class="cont-img">
                    <img
                        :src="item.artists ? item.artists[0].img1v1Url : ''"
                        alt=""
                    />
                </div>
                <div class="cont-name">
                    <div class="name-one">
                        {{ item.name }}
                    </div>
                    <div class="name-two">
                        {{ item.artists ? item.artists[0].name : "" }}
                    </div>
                </div>
            </div>
        </div>

        <!-- 这个是渲染搜索的数据 -->
        <div class="neiron" v-show="inpref != ''">
            <div
                class="neiron-name"
                v-for="(item, index) in searchDatas"
                :key="index"
                @click="namepush(item.keyword)"
            >
                <van-icon name="search" class="sear" />{{ item.keyword }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";

export default {
    data() {
        return {
            songsFass: "",
            searchDatas: [],
            songData: [],
            inpref: "",
            resd: null,
            // 判定有没有传值
            loadingas: "",
            songDataname:'',
        };
    },
    computed: {
         ...mapState(["searchId", "searchShow", "MusicId"]),
        songName() {
            return this.$route.query.name;
        },
    },
    created() {
        this.dds(this.$route.query.name);
    },
    methods: {
        ...mapMutations(["getsearchDataLoc", "getDuratio",
            "getMusiclistOf",
            "searchShowend",
            "searchShowendtwo",
            "getMusicId",
            "AudioPlay",]),

         Datamusic(id) {
            this.$router.push({
                path: "/musicview",
            });
            console.log(id);
            this.getMusicId(id);
            this.getMusiclistOf(this.songData);
            this.searchShowend(false);
            this.searchShowendtwo(false);
            this.getDuratio(0);
            this.AudioPlay(false);
            setTimeout(() => {
                this.AudioPlay(true);
            }, 1000);
        },

        dds(name) {
            console.log(name);
            if (name != undefined) {
                this.$axios
                    .get(`/search`, {
                        params: {
                            // limit:10,
                            keywords: name,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        this.songData = res?.result.songs;
                        this.songDataname = name;
                        this.loadingas = this.songName;
                    });
            }
        },
        rotergo() {
            this.$router.go(-1);
            this.$refs.inps.value = "";
            this.inpref = "";
        },
        getinput() {
            // this.$refs.inps.value;
            // 防抖

            if (this.resd) {
                clearTimeout(this.resd);
            }

            this.resd = setTimeout(() => {
                console.log(this.$refs.inps.value);
                this.inpref = this.$refs.inps.value;

                this.$axios
                    .get(`/search/suggest`, {
                        params: {
                            keywords: this.$refs.inps.value,
                            type: "mobile",
                        },
                    })
                    .then((res) => {
                        console.log(res);
                        // this.searchDatas = res.result.allMatch;
                        if (this.$refs.inps.value != "") {
                            this.searchDatas = res.result.allMatch;
                        }
                    });

                this.resd = false;
            }, 400);
        },
        namepush(name) {
            console.log(name);
            // locoData
            // console.log(localStorage.locoData.push(name));
            let arr1 = JSON.parse(localStorage.getItem("locoData"));
            if (arr1.indexOf(name) == -1) {
                arr1.push(name);
                localStorage.setItem("locoData", JSON.stringify(arr1));
            }
            console.log(arr1);
            this.getsearchDataLoc(arr1);

            this.$router.push({
                path: "/searchview",
                query: {
                    name: name,
                },
            });

            this.$refs.inps.value = "";
            this.inpref = "";
        },
        // 回车跳转路由

        rotergoas() {
            console.log(this.$refs.inps.value);
            this.$router.push({
                path: "/searchview",
                query: {
                    name: this.$refs.inps.value,
                },
            });
        },
    },
    watch: {
        songName(newVal) {
            console.log("newVal", newVal);
            this.dds(newVal);
        },
    },
};
</script>

<style lang="scss" scoped>
.boxing {
    width: 100vw;
    height: 100vh;
    background-color: #121212;

    .loadingss {
        width: 100rem;
        height: 100rem;
        // background-color: red;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 30rem;
    }

    .bosing-nav {
        width: 100%;
        height: 80rem;
        // position: fixed;
        display: flex;

        .search-one {
            width: 50rem;
            height: 80rem;
            text-align: center;
            line-height: 80rem;
            font-size: 20rem;
            color: white;
        }

        .search-icon {
            width: 300rem;
            height: 30rem;
            background-color: #1e1e1e;
            margin: auto 0;
            border-radius: 999rem;
            display: flex;
            position: relative;

            .icon-one {
                position: absolute;
                font-size: 20rem;
                line-height: 30rem;
                margin: 0 10rem;
                color: #ccc;
            }
            .icon-two {
                margin: auto 40rem;
            }
        }
    }

    .main-tach {
        width: 100%;
        height: 87%;
        overflow-y: scroll;
        overflow-x: hidden;
        // background-color: #f50000;

        .tach-cont {
            width: 100%;
            height: 80rem;
            // background-color: #10813e;
            padding: 10rem 20rem;
            display: flex;
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

    .neiron {
        width: 100vw;
        height: 89vh;
        // margin-top: 50rem;
        top: 70rem;
        // position: fixed;
        position: absolute;
        background-color: #121212;
        padding: 0 20rem;
        z-index: 100;
        overflow-x: hidden;
        overflow-y: scroll;
        .neiron-name {
            width: 100%;
            height: 30rem;
            line-height: 30rem;
            color: #ccc;
            font-size: 18rem;
            margin: 0 0 10rem 0;
            // background-color: red;

            .sear {
                font-size: 18rem;
                margin-right: 10rem;
            }
        }
    }
}
input {
    background: none;
    outline: none;
    border: 0px;
    color: #ddd;
}
</style>