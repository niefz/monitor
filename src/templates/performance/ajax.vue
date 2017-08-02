<template>
  <div class="white-wrapper">
    <div class="title">
      <h2>
        <span>ajax请求</span>
        <div class="sub-title">
          指标解读
          <el-tooltip effect="dark" placement="top">
            <div slot="content">网页载入的时间(domLoading，首字节时间)<br/>[主要影响因素：网络耗时]</div>
            <i class="icon icon-tip">&#xe65e;</i>
          </el-tooltip>
        </div>
      </h2>
    </div>
    <div class="content">
      <el-row :gutter="15">
        <el-col :xs="24" :sm="8" :md="8" :lg="8">
          <div class="panel">
            <h3>
              <span>排序方式</span>
            </h3>
            <ul v-if="resource.length">
              <li v-for="item in resource">
                <div class="item relative">
                  <span class="href">{{item.name}}</span>
                  <span class="time">{{Math.round(item.duration)}} ms</span>
                  <i class="icon icon-arrow absolute">&#xe65a;</i>
                </div>
              </li>
              <li v-if="resource.length > 5">
                <a class="more" @click="more">显示全部 +</a>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16">
          <div class="panel">

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="sass">
  .white-wrapper {
    .title {
      min-height: 40px;
      padding: 0 15px;
      h2 {
        font-size: 30px;
        line-height: 40px;
        .sub-title {
          display: inline-block;
          margin-left: 15px;
          font-size: 16px;
          line-height: 1;
          color: #d2d2d2;
        }
      }
    }
    .content {
      padding: 15px 10px 15px 10px;
      .panel {
        padding: 15px;
        background-color: rgba(51, 51, 51, .4);
        border-radius: 3px;
        background-clip: padding-box;
        ul {
          padding-top: 8px;
          li {
            height: 34px;
            margin-bottom: 5px;
            background: rgba(51, 51, 51, .4);
            border-radius: 3px;
            background-clip: padding-box;
            line-height: 34px;
            cursor: pointer;
            .item {
              padding: 0 25px 0 8px;
              overflow: hidden;
              .href, .time {
                font-size: 13px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              .href {
                float: left;
                width: 65%;
              }
              .time {
                float: left;
                width: 35%;
                text-align: right;
              }
              .icon-arrow {
                right: 8px;
                font-size: 12px;
              }
            }
            .more {
              display: block;
              text-align: center;
            }
            &:hover {
              background: rgba(26, 26, 26, .4)
            }
          }
        }
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  import { Tooltip, Row, Col } from 'element-ui';

  export default {
    components: {
      elTooltip: Tooltip,
      elRow: Row,
      elCol: Col,
    },
    data() {
      return {
        resource: [],
      };
    },
    created() {
      axios({
        method: 'GET',
        url: 'http://localhost:8889/ajax',
        params: {
          initiatorType: 'xmlhttprequest',
        },
      }).then((json) => {
        this.resource = json.data;
      });
    },
    methods: {
      more() {

      },
    },
  };
</script>
