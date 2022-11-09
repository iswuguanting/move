<template>
    <div class="bosings">
        <div class="bosing-nav">
            <div class="nav-pic">
                <div class="pic-le">
                    <img src="@/assets/img/1.jpg" alt="">
                </div>
                <div class="pic-ri">
                    <div class="main-one">
                        <div class="focus-on">关注</div>
                        <div class="focus-name">7</div>
                    </div>
                     <div class="main-one">
                        <div class="focus-on">粉丝</div>
                        <div class="focus-name">7</div>
                    </div>
                </div>
            </div>
            <div class="nav-name">
                <div class="that-one">独步天下</div>
                <div class="that-two">av1c3xz1dasdz5d</div>
                <div class="that-three"><span>Gvip</span></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.bosings{
    width: 100vw;
    height: 260rem;
    padding-top: 60rem;
    // background-color: red;

    .bosing-nav{
        width: 100%;
        height: 200rem;
        // background-color: saddlebrown;

        .nav-pic{
            width: 100%;
            height: 100rem;
            // background-color: blue;
            padding: 0 20rem;
            display: flex;

            .pic-le{
                width: 100rem;
                height: 100rem;
                // background-color: aqua;
                padding: 10rem 5rem;
                
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 999rem;
                }
            }

            .pic-ri{
                width: 280rem;
                height: 100rem;
                // background-color: salmon;
                padding: 10rem 5rem;
                display: flex;

                .main-one{
                    width: 50%;
                    height: 100%;
                    // background-color: darkblue;

                    .focus-on{
                        width: 100%;
                        height: 50%;
                        color: #ddd;
                        text-align: center;
                        line-height: 50rem;
                        // background-color: darkcyan;
                    }

                    .focus-name{
                        color:#fff;
                        font-size: 20rem;
                        text-align: center;
                    }
                }
            }
        }

        .nav-name{
            width:100%;
            height:100rem;
            // background-color: salmon;
            padding: 0 20rem;

            .that-one{
                width: 300rem;
                height: 50%;
                font-size: 25rem;
                line-height: 50rem;
                color: white;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                // background-color: darkcyan;
            }
            .that-two{
                width:100%;
                height: 20%;
                color: #6a6a6a;
                // background-color: saddlebrown;
            }
            .that-three{
                width: 100%;
                padding:5rem 0;

                span{
                    color: red;
                    font-weight: 600;
                    padding: 5rem 8rem;
                    border-radius: 999rem;
                background-color: #ff888a3b;

                }
            }
        }
    }
}
</style>