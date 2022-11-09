<template>
    <div class="footsing" @scroll="footsc" ref="foots">
        <van-tabs
            animated
            background="#121212"
            title-active-color="white"
            sticky
        >
            <van-tab title="歌单 ">
                <SingDown />
            </van-tab>
            <van-tab title="下载 ">
                <DownloadView />
            </van-tab>
            <van-tab title="历史播放 "> <HistoricalPlay /></van-tab>
        </van-tabs>
    </div>
</template>

<script>
import SingDown from "./MyHistory/SingDown.vue";
import DownloadView from "./MyHistory/DownloadView.vue";
import HistoricalPlay from "./MyHistory/HistoricalPlay.vue";

export default {
    data() {
        return {};
    },
    components: {
        SingDown,
        DownloadView,
        HistoricalPlay,
    },
    methods: {
        footsc() {
            this.$refs.foots;
            console.log(this.$refs.foots);
        },
    },
};
</script>

<style lang="scss" scoped>
.footsing {
    width: 100vw;
    height: 100vh;
    background-color: #121212;
    padding: 20rem 20rem;
    position: sticky;
}
</style>