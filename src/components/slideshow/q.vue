<!-- 轮播图基本要求：
   - 页面加载，自动播放。鼠标悬停，停止播放。鼠标离开，继续播放
　　- 点击左右箭头切换上一张，下一张图片。
　　- 下方小圆点显示当前位第几张图片。-->
<template>
  <div>
    <h3>轮播图</h3>
    <div class="q-slideshow" @mouseleave="play" @mouseover="stop">
      <ul class="container">
        <li :style="liOffset" v-for="(item,index) in sliders" :key="index">
          <img :src="item.url" :alt="item.desc">
        </li>
      </ul>
      <ul class="direction">
        <li class="left">
          <img src="./icons/left.svg" alt="向左" @click="move(600,-1)"/>
        </li>
        <li class="right">
          <img src="./icons/right.svg" alt="向右" @click="move(600,1)"/>
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
    data() {
      return {
        sliders: [
          {url: require('@/assets/slidshow/1.jpg'), desc: '图1描述'},
          {url: require('@/assets/slidshow/2.jpg'), desc: '图2描述'},
          {url: require('@/assets/slidshow/3.jpg'), desc: '图3描述'},
          {url: require('@/assets/slidshow/4.jpg'), desc: '图4描述'},
          {url: require('@/assets/slidshow/5.jpg'), desc: '图5描述'}
        ],
        offset: 0,
        activeIndex: 0,
        activeDotStyle: {
          backgroundColor: '#FFA500'
        }
      }
    },
    computed: {
      liOffset: function () {
        return {transform: 'translate(' + this.offset + 'px,0)'}
      }
    },
    created() {
      this.play()
    },
    methods: {
      move(offset, direction) {
        const speed = 30
        this.offset += 600 * direction * (-1)
        if (this.offset < -2400) this.offset = 0
        if (this.offset > 0) this.offset = -2400
        this.activeIndex += direction
        if (this.activeIndex >= this.sliders.length) this.activeIndex = 0
        if (this.activeIndex < 0) this.activeIndex = this.sliders.length - 1
        console.log(this.activeIndex, this.offset)
      },
      jump(i) {
        // console.log('切换到第' + i + '张')
        this.offset = -1 * i * 600
        this.activeIndex = i
      },
      play() {
        this.timer = setInterval(() => {
          this.activeIndex++
          this.offset = -1 * this.activeIndex * 600
          if (this.activeIndex >= this.sliders.length) {
            this.activeIndex = 0
            this.offset = 0
          }
          if (this.activeIndex < 0) {
            this.activeIndex = this.sliders.length - 1
            this.offset = -2400
          }
        }, 2000)
      },
      stop(){
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
    width: 600px;
    height: 400px;
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
        width: 600px;
        height: 400px;
        overflow: hidden;
        transition: transform 2s;
        /*transform: translate(-600px,0);*/
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