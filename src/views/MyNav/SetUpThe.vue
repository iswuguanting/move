<template>
    <div class="borbox">
        <nav class="borbox-nav">
            <div class="borbox-nav-left">
                <van-icon name="arrow-left" @click="back" />
            </div>
            <div class="borbox-nav-right">设置</div>
        </nav>

        <div class="borbox-main" v-for="(item,index) in setData" :key="index">
            
            <div class="the-name">
                {{item.name}}
            </div>
            <div class="the-content">
                <div class="content-pig" v-for="(list, index) in item.arr" :key="index">
                    <div class="play-ynzhi">
                        {{list.upname}}
                    </div>
                    <div class="radiy-play">
                        <span>{{list.downname}}</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>
        </div>

        <div class="borbox-foo">
            <div class="foo-tui" @click="loctonno">
                退出登录
            </div>
        </div>
    </div>
</template>

<script>
import setup from "@/apis/setup.js";
export default {
    data() {
        return {
        };
    },
    computed:{
        setData(){
            return setup
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        loctonno(){
            localStorage.setItem("token", "");
            this.$router.push("/login");
        }
    },
};
</script>

<style lang="scss" scoped>
.borbox {
    width: 100%;
    // height: 100vh;
    background-color: #121212;
    padding: 0 10rem;

    .borbox-nav {
        // width: 100vw;
        height: 50rem;
        // display: flex;
        position: sticky;
        top: 0;
        align-items: center;
        text-align: center;
        // position: relative;
        padding: 0 10rem;
        color: white;
        background-color: #121212;

        .borbox-nav-left {
            position: absolute;
            line-height: 50rem;
            font-size: 25rem;
        }

        .borbox-nav-right {
            line-height: 50rem;
            font-size: 18rem;
        }
    }

    .borbox-main{
        // width: 100vw;
        // height:200rem;
        // background-color: aqua;
        margin: 20rem 0;

        .the-name{
            padding: 10rem;
            color: #616161;
        }

        .the-content{
            width: 100%;
            // height: 100rem;
            background-color: #1e1e1e;
            border-radius: 10rem;

            .content-pig{
                padding: 15rem 10rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .play-ynzhi{
                    color: white;
                    font-size: 18rem;
                }
                .radiy-play{
                    font-size:14rem;
                    color: #616161;
                    span{
                        margin-right: 20rem;
                    }
                }
            }
        }
    }

    .borbox-foo{
        width: 100%;
        height: 100rem;
        margin-top: 100rem;
        // background-color: aqua;
        display: flex;
            justify-content: center;

        .foo-tui{
            position: absolute;
            font-size: 20rem;
            color: red;
            margin: 0 auto;
            padding: 10rem 20rem;
            background-color: rgb(255, 0, 0,0.5);
            border-radius: 999rem;
        }
    }

}
</style>