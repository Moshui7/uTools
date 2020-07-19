<template>
  <div>
    <h4>轮播图1</h4>
    <q-slideshow1 :slider-size="sliderSize" :sliders="sliders" :speed="speed" :interval="interval"/>
    <h4>轮播图2</h4>
    <q-slideshow2 :slider-size="sliderSize" :sliders="sliders" :speed="speed" :interval="interval"/>
  </div>
</template>

<script>
  import qSlideshow1 from '@/components/slideshow/slider1'
  import qSlideshow2 from '@/components/slideshow/slider2'

  export default {
    name: 'q1',
    components: {qSlideshow1,qSlideshow2},
    data() {
      return {
        sliders: [
          {url: require('@/assets/slidshow/xm1.png'), desc: '图1描述'},
          {url: require('@/assets/slidshow/xm2.png'), desc: '图2描述'},
          {url: require('@/assets/slidshow/xm3.png'), desc: '图3描述'},
          {url: require('@/assets/slidshow/xm4.png'), desc: '图4描述'},
          {url: require('@/assets/slidshow/xm5.png'), desc: '图4描述'},
          {url: require('@/assets/slidshow/xm6.png'), desc: '图4描述'},
          {url: require('@/assets/slidshow/xm7.png'), desc: '图4描述'},
          {url: require('@/assets/slidshow/xm8.png'), desc: '图5描述'}
        ],
        speed: 1000,
        interval: 2000,
        sliderSize: {
          width: 706,
          height: 182
        }
      }
    }
  }
</script>

<style scoped>

</style>