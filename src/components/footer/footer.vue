<template>
  <div class="footer-wrapper" :class="[theme]">

  </div>
</template>
<style rel="stylesheet/scss" lang="sass">
  $color-141721: #141721;
  $color-292E41: #292E41;
  $color-DCDEE4: #DCDEE4;
  $color-FFFFFF: #FFFFFF;
  .footer-wrapper {
    &.dark {
      background-color: $color-292E41;
    }
  }
</style>
<script type="text/ecmascript-6">
  export default {
    name: 'txlHeader',
    componentName: 'txlHeader',
    props: ['theme'],
    data () {
      return {}
    },
    methods: {}
  }
</script>