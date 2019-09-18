<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="item in list" class="swp-page swiper-slide">
        <a class="js-no-follow" :href="item.url">
          <div class="thumb img-box">
            <img class="goods-main-photo fadeIn" :src="item.img">
          </div>
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: "Swiper",
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted(){
      new Swiper('.swiper-container',{
        autoplay: true,//可选选项，自动滑动
        pagination: {
          el: '.swiper-pagination',
        },
      })
    }

  }
</script>

<style scoped>
  .thumb img-box{
    text-align: center;
    position: relative;
  }

  .swiper-slide img{
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    max-width: 100%;
    max-height: 100%;
    height: 100%;
  }
  .swiper-container {
    height: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 1
  }

  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    -webkit-transition-property: -webkit-transform, left, top;
    -webkit-transition-duration: 0s;
    -webkit-transform: translateZ(0);
    -webkit-transition-timing-function: ease;
    -moz-transition-property: -moz-transform, left, top;
    -moz-transition-duration: 0s;
    -moz-transform: translateZ(0);
    -moz-transition-timing-function: ease;
    -o-transition-property: -o-transform, left, top;
    -o-transition-duration: 0s;
    -o-transform: translateZ(0);
    -o-transition-timing-function: ease;
    -o-transform: translate(0);
    -ms-transition-property: -ms-transform, left, top;
    -ms-transition-duration: 0s;
    -ms-transform: translateZ(0);
    -ms-transition-timing-function: ease;
    transition-property: left, top, -webkit-transform;
    transition-property: transform, left, top;
    transition-property: transform, left, top, -webkit-transform;
    transition-duration: 0s;
    transform: translateZ(0);
    transition-timing-function: ease
  }

  .swiper-free-mode > .swiper-wrapper {
    transition-timing-function: ease-out;
    margin: 0 auto
  }

  .swiper-slide {
    float: left
  }

  .swiper-wp8-horizontal {
    -ms-touch-action: pan-y
  }

  .swiper-wp8-vertical {
    -ms-touch-action: pan-x
  }


  .swp-thumbnail-list {
    margin-right: 6px
  }

  .swiper-pagination-switch {
    display: inline-block;
    margin: 7px 4px 0;
    width: 5px;
    height: 5px;
    background: url(/v2/image/pagination.png) no-repeat scroll -1px -1px;
    cursor: pointer
  }

  @media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5) {
    .swiper-pagination-switch {
      background-image: url(/v2/image/pagination@2x.png);
      background-position: 0 0;
      background-size: 5px 10px
    }
  }

  .swiper-active-switch {
    background-position: -1px -8px
  }

  @media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5) {
    .swiper-active-switch {
      background-image: url(/v2/image/pagination@2x.png);
      background-position: 0 -5px;
      background-size: 5px 10px
    }
  }

  .swp .swiper-wrapper,
  .swp .swp-page {
    overflow: hidden
  }

  .swp .swp-page {
    display: none;
    width: 100%;
    height: 100%;
    text-align: center
  }

  .swp .swp-page img {
    max-width: 100%;
    max-height: 100%
  }

  .swp .swp-page:first-child {
    display: block
  }
  .js-no-follow{
    height: 100%;
  }


</style>
