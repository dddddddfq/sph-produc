<template>
    <div class="swiper-container" id="mySwiper" ref="lunbotu">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(Carouse, index) in CarouseList" :key="Carouse.id">
                <img :src="Carouse.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    export default {
        name: 'Carouse',
        props: ['CarouseList'],
        watch: {
            bannerList: {
                immediate: true,
                handler(newValue, oldValue) {
                    this.$nextTick(() => {
                        new Swiper(this.$refs.lunbotu, {
                            //自动循环播放
                            autoplay: true,
                            loop: true, // 循环模式选项
                            // 如果需要分页器
                            pagination: {
                                el: ".swiper-pagination",
                                clickable: true,
                            },
                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                        });
                    });
                },
            },
        },

    };
</script>

<style>
</style>