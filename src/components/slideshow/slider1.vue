<!-- 轮播图基本要求：
   - 页面加载，自动播放。鼠标悬停，停止播放。鼠标离开，继续播放
　　- 点击左右箭头切换上一张，下一张图片。
　　- 下方小圆点显示当前位第几张图片。-->
<!-- 参数说明：
   - 图片列表
   - 轮播图宽、高
   - 自动播放的时间间隔
   - 图片滑动的速度
 -->
<template>
  <div>
    <div :style="initStyle" class="q-slideshow" @mouseleave="play" @mouseover="stop">
      <ul class="container">
        <li :style="[liOffset,initStyle]" v-for="(item,index) in sliders" :key="index">
          <img :src="item.url" :alt="item.desc">
        </li>
      </ul>
      <ul class="direction">
        <li class="left">
          <img src="./icons/left.svg" alt="向左" @click="move(-1)"/>
        </li>
        <li class="right">
          <img src="./icons/right.svg" alt="向右" @click="move(1)"/>
        </li>
      </ul>
      <ul class="dots">
        <li :style="i===activeIndex?activeDotStyle:''" v-for="(dot,i) in sliders" :key="i" @click="jump(i)"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      sliderSize: {
        type: Object,
        default() {
          return {
            width: 600,
            height: 400
          }
        }
      },
      sliders: {
        type: Array,
        default() {
          return []
        }
      },
      speed: {
        type: Number,
        default: 500
      },
      interval: {
        type: Number,
        default: 3000
      }
    },
    data() {
      return {
        offset: 0,
        activeIndex: 0,
        activeDotStyle: {
          backgroundColor: '#FFA500'
        },
        imgWidth: this.sliderSize.width,
        initStyle: {
          width: this.sliderSize.width + 'px',
          height: this.sliderSize.height + 'px'
        }
      }
    },
    computed: {
      liOffset: function () {
        return {
          transform: 'translate(' + this.offset + 'px,0)',
          transition: 'transform ' + this.speed + 'ms'
        }
      }
    },
    created() {
      this.play()
    },
    methods: {
      init() {

      },
      move(direction) {
        const width = this.imgWidth
        const sliderLength = this.sliders.length
        const maxOffset = (sliderLength - 1) * width
        this.offset += width * direction * (-1)
        if (this.offset < -maxOffset) this.offset = 0
        if (this.offset > 0) this.offset = -maxOffset
        this.activeIndex += direction
        if (this.activeIndex >= this.sliders.length) this.activeIndex = 0
        if (this.activeIndex < 0) this.activeIndex = this.sliders.length - 1
      },
      jump(i) {
        // console.log('切换到第' + i + '张')
        this.offset = -1 * i * this.imgWidth
        this.activeIndex = i
      },
      play() {
        this.timer = setInterval(() => {
          this.activeIndex++
          this.offset = -1 * this.activeIndex * this.imgWidth
          if (this.activeIndex >= this.sliders.length) {
            this.activeIndex = 0
            this.offset = 0
          }
          if (this.activeIndex < 0) {
            this.activeIndex = this.sliders.length - 1
            this.offset = -(this.sliders.length - 1) * this.imgWidth
          }
        }, this.interval)
      },
      stop() {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
</script>

<style scoped lang="scss">
  .q-slideshow {
    text-align: center;
    position: relative;
    /*width: 600px;
    height: 400px;*/
    margin: 0 auto;
    overflow: hidden;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .container {
      display: flex;
      position: absolute;

      li {
        /*height: 400px;*/
        /*width: 600px;*/
        overflow: hidden;
        /*transition: transform 2s;*/
      }
    }

    &:hover .direction {
      opacity: 0.5;
      transition: opacity .75s;
    }

    .direction {
      opacity: 0;
      transition: opacity .75s;

      .left, .right {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: rgba(0, 0, 0);
        border-radius: 50%;
        cursor: pointer;
        padding-left: 12px;
        padding-top: 10px;
        // 距离图片上边框50%（以图片高度为标准）
        top: 50%;
        // 向上平移图标高度的50%
        transform: translateY(-50%);

        img {
          height: 30px;
          transform: translateX(-6px) translateY(-5px);
        }
      }

      .left {
        left: 3%;
      }

      .right {
        right: 3%;

      }
    }

    .dots {
      opacity: 0.75;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);

      li {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0 3px;
        border: 1px solid white;
        border-radius: 50%;
        background-color: #333333;
        cursor: pointer;
      }
    }
  }
</style>