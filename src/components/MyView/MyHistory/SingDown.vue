<template>
    <div class="sing-dowm">
        <div class="sing-nav">
            <div class="sing-nav-le">创建的歌单</div>
            <div class="sing-nav-ri"><span>+</span> 创建</div>
        </div>
        <div class="sing-main">
            <div class="main-theone">
                <div class="main-naros">
                    <div class="naros-icon">
                        <van-icon name="like" />
                    </div>
                    <div class="naros-name">
                        <div class="my-naros">我喜欢音乐</div>
                        <div class="my-numbe">0首</div>
                    </div>
                </div>
            </div>
            <div class="main-theone">
                <div class="main-naros">
                    <img src="@/assets/qiyun.jpg" class="naros-img" alt="" />
                    <div class="naros-name">
                        <div class="my-naros">我喜欢音乐</div>
                        <div class="my-numbe"><i class="wd-icon-goods"></i>0首</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
};
</script>

<style lang="scss" scoped>
.sing-dowm {
    width: 100%;
    height: 100%;
    // background-color: aqua;

    .sing-nav {
        width: 100%;
        padding: 10rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .sing-nav-le {
            color: #6a6a6a;
        }
        .sing-nav-ri {
            color: #fff;
            font-size: 16rem;
        }
    }

    .sing-main {
        width: 100%;

        .main-theone {
            width: 100%;
            padding: 10rem 0;

            .main-naros {
                width: 100%;
                height: 100%;
                // background-color: darkcyan;
                display: flex;

                .naros-icon {
                    width: 80rem;
                    height: 80rem;
                    background: linear-gradient(125deg, #00ff00, #0000ff);
                    font-size: 30rem;
                    color: red;
                    line-height: 80rem;
                    text-align: center;
                    margin-right: 30rem;
                    border-radius: 5rem;
                }

                .naros-img {
                    width: 80rem;
                    height: 80rem;
                    margin-right: 30rem;
                    border-radius: 5rem;
                    


                }

                .naros-name {
                    margin: auto 0;

                    .my-naros {
                        font-size: 18rem;
                        color: white;
                    }

                    .my-numbe {
                        color: #6a6a6a;
                    }
                }
            }
        }
    }
}
</style>