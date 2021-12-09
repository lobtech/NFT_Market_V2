import store from '@/store'
import { computed, readonly, ref } from 'vue'

// 首屏加载
const menu_show = ref(false) // 加载状态
const hasMenu: any = (value: boolean) => {
    menu_show.value = !menu_show.value;
}

export {
    hasMenu 
}

export{
    menu_show
}