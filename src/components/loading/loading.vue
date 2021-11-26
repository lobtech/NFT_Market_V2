<template>
    <div class="mask" :style="[Style]">
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, readonly, ref } from 'vue'
const props = defineProps({
    show: Boolean, // 显示隐藏
    index: [String, Number], // 层级
})
const Style: any = computed(() => {
    let style = {
        opacity: '1',
        'z-index': props.index || '999',
    }
    if (!props.show) {
        style = {
            opacity: '0',
            'z-index': '-1',
        }
    }
    return style
})
</script>

<style lang="scss" scoped>
.mask {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: -1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    transition: all 230ms ease-out;
    opacity: 0;
    .spinner {
        margin: 100px auto;
        width: 100px;
        height: 60px;
        text-align: center;
        font-size: 10px;
    }

    .spinner > div {
        background-color: #2d5791;
        height: 100%;
        width: 10px;
        display: inline-block;
        margin: 0 2px;
        -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
        animation: stretchdelay 1.2s infinite ease-in-out;
    }

    .spinner .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }

    .spinner .rect3 {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
    }

    .spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    .spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }

    @-webkit-keyframes stretchdelay {
        0%,
        40%,
        100% {
            -webkit-transform: scaleY(0.4);
        }
        20% {
            -webkit-transform: scaleY(1);
        }
    }

    @keyframes stretchdelay {
        0%,
        40%,
        100% {
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
        }
        20% {
            transform: scaleY(1);
            -webkit-transform: scaleY(1);
        }
    }
}
</style>
