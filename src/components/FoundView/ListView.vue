<template>
    <div class="bosing">
        <van-tabs v-model="active" animated background="#121212" title-active-color="#fff" class="nian">
            <van-tab
                v-for="item in musicData"
                :key="item.id"
                :title="item.name"
                class="nian"
            >
                <MusicTableThree :mid="item.id"></MusicTableThree>
               
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import MusicTableThree from "@/components/SingleTable/MusicTableThree.vue";
export default {
    data() {
        return {
            musicData:[
                {
                    name:'新歌榜',
                    id:3779629
                },
                {
                    name:'热歌榜',
                    id:3778678
                },
                {
                    name:'原创榜',
                    id:2884035
                },
                {
                    name:'飙升榜',
                    id:19723756
                }
            ],
            active:0
        }
    },
    components:{
        MusicTableThree
    }
};
</script>

<style lang="scss" scoped>
.bosing {
    width: 100vw;
    height: 92vh;
    // background-color: #3192a8;
    background-color: #121212;
    padding-bottom: 50rem;
    border: 1rem solid #121212;
    margin-top: -1rem;
    overflow: hidden;
    .nian{
        position: sticky;
        top: 50rem;
    }
}
</style>