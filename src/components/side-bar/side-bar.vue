<template>
  <div class="side-bar">
    <nav class="side-nav">
      <ul class="side-nav-menu" v-if="nav">
        <li class="side-nav-item" v-for="item in nav">
          <strong>
            <a :href="item.path" :class="{'active': path === item.path}"><i class="icon icon-side" v-html="item.icon"></i>{{item.name}}</a>
          </strong>
          <ul class="side-bar-sub-menu" v-if="item.children">
            <li v-for="child in item.children">
              <a :href="item.path + child.path">{{child.name}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style rel="stylesheet/scss" lang="sass">
  $color-141721: #141721;
  $color-292E41: #292E41;
  $color-DCDEE4: #DCDEE4;
  $color-F5F5F5: #F5F5F5;
  $color-FFFFFF: #FFFFFF;
  .side-bar {
    float: left;
    width: 150px;
    padding-left: 10px;
    .side-nav {
      float: left;
      width: 100%;
      height: 100%;
      overflow: auto;
      .side-nav-menu {
        li {
          margin-bottom: 2px;
          font-size: 13px;
          strong {
            a {
              display: block;
              height: 34px;
              padding-left: 10px;
              line-height: 34px;
              color: $color-FFFFFF;
              .icon-side {
                float: left;
                width: 24px;
                font-size: 16px;
                zoom: 1;
                opacity: .5;
                filter: alpha(opacity=50);
              }
              &.active, &:hover {
                background: rgba(0, 0, 0, .07);
                border-radius: 3px;
                background-clip: padding-box;
                transition: background-color .2s;
              }
            }
          }
          .side-bar-sub-menu {
            li {
              a {
                display: block;
                height: 26px;
                padding-left: 48px;
                line-height: 26px;
                color: $color-FFFFFF;
                &.active, &:hover {
                  text-decoration: underline;
                }
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
    name: 'sideBar',
    componentName: 'sideBar',
    data() {
      return {
        nav: null,
      };
    },
    created() {
      this.getNav();
      this.setActive();
    },
    methods: {
      getNav() {
        axios({
          method: 'GET',
          url: 'http://localhost:3034/nav',
        }).then((json) => {
          this.nav = json.data.resultList;
        });
      },
      setActive() {
        this.path = window.location.pathname;
      },
    },
  };
</script>