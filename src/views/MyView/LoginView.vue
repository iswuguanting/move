<template>
    <div class="bosing">
        <div class="nav-img">
            <!-- 返回主页 -->
            <div class="zhuye" @click="zhuyes">
                <van-icon name="arrow-left" />
            </div>
            <div class="shu-ru">
                <div class="shuru-img">
                    <input
                        type="text"
                        ref="text"
                        class="inp1"
                        name="inp1"
                        id="inp1"
                        placeholder="请输入6-11位数账号"
                    />
                </div>
                <div class="shuru-img">
                    <input
                        type="password"
                        ref="inpur"
                        class="inp1"
                        name="inp2"
                        id="inp2"
                        placeholder="请输入6-11位密码"
                    />
                    <van-icon
                        name="closed-eye"
                        class="closed"
                        @click="closedOne"
                        v-show="closed == true"
                    />
                    <van-icon
                        name="eye-o"
                        class="closed"
                        @click="closedTwo"
                        v-show="closed == false"
                    />
                </div>
                <div class="zhuche-denlu">
                    <div class="zhuche" @click="zhuche">注册</div>
                    <div class="denlu" @click="denglu">登录</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            closed: true,
        };
    },
    methods: {
        ...mapMutations(["highlightedActive", "highlightedActive"]),

        closedOne() {
            this.closed = !this.closed;
            this.$refs.inpur.type = this.closed ? "password" : "text";
        },
        closedTwo() {
            this.closed = !this.closed;
            this.$refs.inpur.type = this.closed ? "password" : "text";
        },

        // 主页
        zhuyes() {
            this.$router.push("/");
            this.highlightedActive(1);
        },

        getUuidCode() {
            //64长度
            let len = 128;
            let rando = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                "#",
                "$",
                "%",
                "&",
                "*",
                "+",
                "-",
                "/",
                "=",
                "?",
                "@",
                "^",
                "_",
                "~",
            ];
            console.log(rando.length);
            let uuid = "";
            for (let i = 0; i < len; i++) {
                let index = Math.floor(Math.random() * 77);
                uuid += rando[index];
            }
            return uuid;
        },

        // 注册账号
        zhuche() {
            let loginto = JSON.parse(localStorage.getItem("logintoken"));

            // 账号value
            let id = this.$refs.text.value;

            // 数字正则
            let reg = /^[0-9]+$/;

            // 判定是不是数字
            console.log(typeof loginto);
            // console.log(id);
            // console.log(reg);
            // console.log(reg.test(id))

            if (reg.test(id) == true) {
                let pasw = this.$refs.inpur.value;

                if (
                    id.length >= 6 &&
                    id.length <= 11 &&
                    pasw.length >= 6 &&
                    pasw.length <= 18
                ) {
                    console.log(id, pasw);
                    let tuanfa = false;
                    loginto.filter((item) => {
                        if (item.id == id) {
                            tuanfa = true;
                        } else {
                            this.$toast("账号已存在");
                        }
                    });

                    if (tuanfa == false) {
                        let obj = {
                            id: id,
                            pasw: pasw,
                            token: this.getUuidCode(),
                        };
                        loginto.push(obj);
                        localStorage.setItem(
                            "logintoken",
                            JSON.stringify(loginto)
                        );
                        this.$toast("注册成功");
                        this.$refs.text.value = "";
                        this.$refs.inpur.value = "";
                    }
                } else {
                    this.$toast("账号或密码长度不符合");
                }
            } else {
                this.$toast("账号必须为数字");
            }
        },
        // 登录账号
        denglu() {
            console.log(153);
            let logintokens = JSON.parse(localStorage.getItem("logintoken"));
            if (
                localStorage.token == null ||
                localStorage.token == undefined ||
                localStorage.token == ""
            ) {
                let id = this.$refs.text.value;
                let pasw = this.$refs.inpur.value;
                logintokens.filter((item) => {
                    if (item.id == id && item.pasw == pasw) {
                        // 更改token
                        let toke = this.getUuidCode();
                        item.token = toke;
                        localStorage.setItem("token", toke);

                        this.$toast("登录成功");
                        this.highlightedActive(1);
                        this.$router.push("/foundview");
                        this.$refs.text.value = "";
                        this.$refs.inpur.value = "";
                    }
                });
                if (
                    localStorage.token == null ||
                    localStorage.token == undefined ||
                    localStorage.token == ""
                ) {
                    this.$toast("账号或密码错误");
                } else {
                    this.$toast("登录成功");
                }
            } else {
                this.$toast("已登录");
            }
            console.log(logintokens);
            // 账号value
            let text = this.$refs.text.value;

            // 密码value
            let inpur = this.$refs.inpur.value;

            logintokens.filter((item) => {
                if (item.id == text && item.pasw == inpur) {
                    // 更改token
                    let toke = this.getUuidCode();
                    item.token = toke;
                    localStorage.setItem("token", toke);
                    this.$toast("登录成功");
                    this.highlightedActive(1);
                    this.$router.push("/foundview");

                    this.$refs.text.value = "";
                    this.$refs.inpur.value = "";
                }
            });
            // 重新给token赋值
            localStorage.setItem("logintoken", JSON.stringify(logintokens));
            if (
                localStorage.token == null ||
                localStorage.token == undefined ||
                localStorage.token == ""
            ) {
                this.$toast("账号或密码错误");
            } else {
                this.$toast("登录成功");
            }

            console.log(text, inpur);
        },
    },
};
</script>

<style lang="scss" scoped>
.bosing {
    width: 100vw;
    height: 100vh;
    // background-color: red;

    .nav-img {
        width: 100vw;
        height: 100vh;
        background-image: url("@/assets/qiyun.jpg");
        position: relative;

        .zhuye {
            position: absolute;
            top: 10rem;
            left: 10rem;
            font-size: 30rem;
            font-weight: bold;
            color: red;
        }

        .shu-ru {
            position: absolute;
            width: 200rem;
            height: 100rem;
            bottom: 100rem;
            left: 0;
            right: 0;
            margin: 0 auto;
            // background-color: aqua;

            .shuru-img {
                width: 100%;
                height: 33.3%;
                // background-color: #ccc;
                background-image: url("@/assets/shuru.png");
                background-size: 200rem 33rem;
                position: relative;

                .inp1 {
                    margin: 0 0 0 22rem;
                }

                .closed {
                    color: rgb(154, 154, 154);
                    position: absolute;
                    top: 8rem;
                    right: 20rem;
                    font-size: 20rem;
                }
            }

            .zhuche-denlu {
                display: flex;
                justify-content: space-around;
                line-height: 30rem;

                div {
                    padding: 0 10rem;
                    border-radius: 999rem;
                    background-color: aqua;
                    z-index: 10;
                }
            }
        }
    }
}
input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    color: blue;
}
</style>