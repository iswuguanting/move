<template>
    <div class="search" :class="{bac:pageY>=80}">
        <div class="search-one" >
            发现
        </div>
        <div class="search-icon">
            <van-icon name="search" @click="getsearch" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageY:0
        }
    },
    methods:{
         handscoll(){
            let resd = Math.floor(document.documentElement.scrollTop || document.body.scrollTop);
            // console.log(this.pageY);
            this.pageY = resd;
        }, 
        getsearch(){
            this.$router.push({path:"/search"})
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handscoll)
    },
}
</script>

<style lang="scss" scoped>
.search{
    width: 100vw;
    height: 50rem;
    position: fixed;
    display: flex;
    justify-content: space-between;
    padding: 20rem 10rem 10rem 10rem;
    z-index: 100;

   
    .search-one{
        color: white;
        font-size: 16rem;
        font-weight: 600;
    }
    .search-icon{
        color: white;
        font-size: 20rem;

    }
}
 .bac{
        background-color: black;

    }
    .bac2{
        background-color: rgb(0, 0, 0,0.5);

    }
</style>