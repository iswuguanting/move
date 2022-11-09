import {
    Swipe,
    SwipeItem,
    Lazyload,
    NavBar,
    Sticky,
    Button,
    Popup,
    Loading,
    PullRefresh,
    Tabbar,
    Search,
    TabbarItem,
    Icon,
    Slider,
    Toast,
    Tab,
    Tabs,
    ShareSheet,
    SwipeCell,
    Dialog
} from 'vant'

const vantComponents = [
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    Button,
    PullRefresh,
    Popup,
    Loading,
    Sticky,
    Lazyload,
    Swipe,
    SwipeItem,
    Slider,
    Toast,
    Tab,
    Tabs,
    ShareSheet,
    SwipeCell,
    Dialog
]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}