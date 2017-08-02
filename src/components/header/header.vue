<template>
  <header class="header-wrapper" :class="[theme]">
    <div class="header">
      <a class="logo" href="http://txl.midea.com.cn">
        <img src="/assets/images/LOGO@2x.png">
      </a>
    </div>
  </header>
</template>
<style rel="stylesheet/scss" lang="sass">
  $color-141721: #141721;
  $color-292E41: #292E41;
  $color-DCDEE4: #DCDEE4;
  $color-FFFFFF: #FFFFFF;
  .header-wrapper {
    &:before, &:after {
      display: table;
      content: '';
    }
    &:after {
      clear: both;
    }
    &.dark {
      .header {
        height: 60px;
        padding: 0 40px;
        .logo {
          float: left;
          padding: 14px 0;
          height: 32px;
          img {
            height: 100%;
          }
        }
      }
    }
    &.light {
      background-color: $color-DCDEE4;
      .header {
        padding: 0 40px;
        .logo {
          float: left;
          font-size: 14px;
          line-height: 60px;
          color: $color-292E41;
        }
        .menu {
          li {
            float: left;
            height: 60px;
            padding: 0 26px;
            line-height: 60px;
            a {
              font-size: 14px;
              color: $color-292E41;
            }
            &:hover {
              a {
                color: $color-FFFFFF;
              }
            }
            &.active {
              background-image: linear-gradient(-180deg, $color-DCDEE4 0%, $color-DCDEE4 100%);
              a {
                color: $color-FFFFFF;
              }
            }
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  export default {
    name: 'txlHeader',
    componentName: 'txlHeader',
    props: ['theme'],
    methods: {},
  };
</script>