import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { State } from '../../store'
// 模块扩展
// proxy.store.* 的强类型支持
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}