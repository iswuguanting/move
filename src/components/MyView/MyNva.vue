<template>
    <div class="bosing-nav">
        <van-icon name="bell" />
        <van-icon name="setting-o" class="setri" @click="SetUpThe" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        SetUpThe() {
            this.$router.push("/setupthe");
        }
    },
}
</script>

<style lang="scss" scoped>
.bosing-nav{
    width: 100vw;
    height: 50rem;
    position: fixed;    
    padding: 0 20rem;
    line-height: 50rem;
    font-size: 20rem;
    color: white;
    text-align: end;

    .setri{
        margin-left: 20rem;
    }
}
</style>