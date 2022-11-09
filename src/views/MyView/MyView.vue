<template>
    <div
        class="bosing"
        :style="{
            background: `linear-gradient(331deg, #121212 0% , #121212 80% , ${loc} 100%)`,
        }"
    >
        <!-- nav -->
        <MyNva />

        <!-- 内容 -->
        <MyContent />

        <!-- Playlist, downloads, history 歌单，下载，历史 -->
        <MyHistory />
    </div>
</template>

<script>
import MyNva from "@/components/MyView/MyNva.vue";
import MyContent from "@/components/MyView/MyContent.vue";
import MyHistory from "@/components/MyView/MyHistory.vue";


import { mapState } from "vuex";
export default {
    data() {
        return {};
    },
    created() {},
    computed: {
        ...mapState(["homecolor"]),

        loc(){
            return JSON.parse(localStorage.getItem("loc"));
        }
    },
    methods: {},
    // 路由守卫
    beforeRouteEnter(to, from, next) {
        // 跳到LoginView
        // 获取token的密钥
        let token = localStorage.token; //没有token会undefined
        // 拿到token的值
        let tokens = localStorage.getItem("token");
        // console.log("tokenstokenstokenstokenstokenstokensv", tokens);
        //  判定token的值和logintoken里的值有没有对应上
        let tokenlog = false;
        // 拿到logintoken的值
        let token2 = JSON.parse(localStorage.getItem("logintoken"));

        token2.filter((item) => {
            console.log(item);
            if (item.token == tokens) {
                tokenlog = true;
            }
        });

        console.log(token2);
        console.log(tokens);
        console.log(token);
        if (token == null || token == undefined || tokenlog == false) {
            next({ path: "/login" });
        } else {
            next();
        }

        // next({ path: "/login" });

        // console.log(to);
        // // console.log(from);
        // console.log(next);
        // next();
    },

    components:{
        MyNva,
        MyContent,
        MyHistory
    }
};
</script>
<style lang="scss" scoped>
.bosing {
    width: 100vw;
    height: 100vh;
}
</style>