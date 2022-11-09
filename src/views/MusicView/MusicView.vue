<template>
    <div class="bosing">
        <MusicPanel @setAudioCurrentTime="setAudioCurrentTime"/>
        <MusicTabber/>
    </div>
</template>

<script>
import MusicTabber from "@/components/MusicVIew/MusicTabber.vue";
import MusicPanel from "@/components/MusicVIew/MusicPanel.vue";

export default {
    data() {
        return {
            
        }
    },
    methods: {
        setAudioCurrentTime(cs){
            this.$emit('setAudioCurrentTime',cs)
        }
    },
    components: {
        MusicTabber,
        MusicPanel
    },
}
</script>

<style lang="scss" scoped>
.bosing{

    width: 100vw;
    height: 100vh;
    background-color: #ddd;
    background: linear-gradient(125deg, #00ff0054, #0000ff54);
}
</style>