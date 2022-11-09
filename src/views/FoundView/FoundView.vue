<template>

 <div
        class="bosing"
        :style="{
            background: `linear-gradient(331deg, #121212 0% , #121212 65% , ${back} 100%)`,
        }"
    >
        <SearchView />

        <MusicRadio @putmusic="putmusic" />

        <!-- <div class="ss">transition</div> -->
        <ListView />
    </div>

   
</template>

<script>
import SearchView from "@/components/FoundView/SearchView";
import MusicRadio from "@/components/FoundView/MusicRadio";
import ListView from "@/components/FoundView/ListView";

export default {
    components: {
        SearchView,
        MusicRadio,
        ListView,
    },
    data() {
        return {
            back: "",
        };
    },
    methods: {
        putmusic(data) {
            console.log(data);
            this.back = data.color;
        },
    },
};
</script>

<style lang="scss" scoped>
.bosing {
    width: 100vw;
    height: 100vh;
    // background-color: #3192a8;
    position: relative;

    .ss {
        color: #fff;
    }
}
</style>