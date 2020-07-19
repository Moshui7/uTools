<template>
  <div>
    <div :style="initStyle" class="q-slideshow" @mouseleave="play" @mouseover="stop">
      <ul class="container">
        <li :style="[liOffset,initStyle,transSpeed]" v-for="(item,index) in liList" :key="index">
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
        <li :style="i===activeIndex?{backgroundColor: '#FFA500'}:''" v-for="(dot,i) in sliders" :key="i"
            @click="jump(i)"></li>
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
        liList: [],
        offset: 0,
        activeIndex: 0,
        // activeDotStyle:,
        imgWidth: this.sliderSize.width,
        initStyle: {
          width: this.sliderSize.width + 'px',
          height: this.sliderSize.height + 'px'
        },
        transSpeed: {
          transition: 'transform ' + this.speed + 'ms'
        },
        onpresscTimeDIR: 0,
        onpresscTimeDOT: 0
      }
    }
    ,
    computed: {
      liOffset: function () {
        return {
          transform: 'translate(' + (this.offset - this.imgWidth) + 'px,0)'
        }
      }
    },
    created() {
      this.setLiList(0)
      this.play()
    },
    methods: {
      setLiList(currentIndex) {
        const sliderLength = this.sliders.length
        this.liList[1] = {...this.sliders[currentIndex]}
        if (currentIndex === 0) {
          this.liList[0] = {...this.sliders[sliderLength - 1]}
          this.liList[2] = {...this.sliders[1]}
        } else if (currentIndex === sliderLength - 1) {
          this.liList[0] = {...this.sliders[sliderLength - 2]}
          this.liList[2] = {...this.sliders[0]}
        } else {
          this.liList[0] = {...this.sliders[currentIndex - 1]}
          this.liList[2] = {...this.sliders[currentIndex + 1]}
        }
      },
      translate() {
        this.transSpeed = {
          transition: 'transform ' + this.speed + 'ms'
        }
        if (this.activeIndex >= this.sliders.length) this.activeIndex = 0
        if (this.activeIndex < 0) this.activeIndex = this.sliders.length - 1
        setTimeout(() => {
          this.setLiList(this.activeIndex)
          this.offset = 0
          this.transSpeed = {
            transition: 'transform 0ms'
          }
        }, this.speed)
      },
      move(direction) {
        if ((Date.now() - this.onpresscTimeDIR) < this.speed) {
          return
        } else {
          this.onpresscTimeDIR = Date.now()
        }
        this.offset = this.imgWidth * direction * (-1)
        this.activeIndex += direction
        this.translate()
      },
      jump(i) {
        if ((Date.now() - this.onpresscTimeDOT) < this.speed) {
          return
        } else {
          this.onpresscTimeDOT = Date.now()
        }
        this.liList[2] = {...this.sliders[i]}
        this.offset = this.imgWidth * (-1)
        this.activeIndex = i
        this.translate()
      },
      play() {
        this.timer = setInterval(() => {
          this.move(1)
        }, this.interval)
      }
      ,
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