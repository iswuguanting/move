<template>
    <div class="bosing">
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
        <div class="searchjilu">
            <div>搜索记录</div>
            <div>
                <van-icon name="delete-o" @click="searchNo" />
            </div>
        </div>
        <!--   -->
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

        <SearchRecord />
    </div>
</template>

<script>
import { Dialog } from "vant";
import { mapMutations } from "vuex";
import SearchRecord from "@/components/SearchView/SearchRecord.vue";
export default {
    data() {
        return {
            searchDatas: [],
            resd: null,
            inpref: "",
        };
    },
    created() {},
    methods: {
        ...mapMutations(["getsearchDataLoc"]),

        rotergo() {
            this.$router.go(-1);
            this.$refs.inps.value = "";
            this.inpref = "";
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
                        if(this.$refs.inps.value != ''){
                            this.searchDatas = res.result.allMatch;
                        }
                    });

                this.resd = false;
            }, 400);
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

        // 是否清空历史搜索
        searchNo() {
            Dialog.confirm({
                title: "确定删除搜索记录吗",
                // message: "弹窗内容",
            })
                .then(() => {
                    // on confirm
                    console.log("object");
                    this.getsearchDataLoc([]);
                    localStorage.setItem("locoData", JSON.stringify([]));
                })
                .catch(() => {
                    // on cancel
                    console.log(454);
                    this.$toast("您取消了删除");
                    
                });
        },
    },

    components: {
        SearchRecord,
    },
};
</script>

<style lang="scss" scoped>
.bosing {
    width: 100vw;
    height: 100vh;
    background-color: #121212;
    position: relative;
    overflow: hidden;

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

    .searchjilu {
        width: 100%;
        padding: 0 20rem;
        color: #aaa;
        display: flex;
        justify-content: space-between;
        line-height: 10rem;
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