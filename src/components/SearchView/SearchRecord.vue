<template>
    <div class="bosing">
        <div class="searchjilus" >
            <div class="neirs" v-for="(item,index) in searchDataLoc" :key="index" @click="itemName(item)">{{item}}</div>
        </div>
        
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    data() {
        return {
        };
    },
    computed:{
        ...mapState(["searchDataLoc"])
    
    },
    methods: {
        itemName(name){
            console.log(111);
            // this.$emit("itemname",name);
            console.log(name);
            this.$router.push({path:"/searchview",query:{name:name}});
        }
    },
};
</script>

<style lang="scss" scoped>
.bosing {
    .searchjilus {
        width: 100%;
        padding: 20rem 20rem;
        // height: 100rem;
        // background-color: red;
        display: flex;
        overflow: hidden;
        flex-wrap: wrap;

        .neirs {
            color: #ccc;
            border-radius: 999rem;
            padding: 10rem;
            line-height: 10rem;
            background-color: #1e1e1e;
            margin: 5rem 5rem 0 0;
            word-break: break-word;
            //   white-space: pre-line;
        }
    }
}
</style>