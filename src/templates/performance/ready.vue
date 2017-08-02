<template>
  <div class="white-wrapper">
    <div class="title">
      <h2>
        <span>资源加载</span>
        <div class="sub-title">
          指标解读
          <el-tooltip effect="dark" placement="top">
            <div slot="content">资源加载完成、window.onload(loadEventStart)<br/>[主要影响因素：网页body标签内的图片、iframe嵌套页和第三方资源]</div>
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
            <ul v-if="ready">
              <li v-for="resource in ready">
                <el-tooltip effect="dark" placement="right">
                  <div slot="content">{{resource.name}}</div>
                  <div class="item relative">
                    <span class="href">{{resource.name}}</span>
                    <span class="time">{{Math.round(resource.duration)}} ms</span>
                    <i class="icon icon-arrow absolute">&#xe65a;</i>
                  </div>
                </el-tooltip>
              </li>
              <li v-if="ready.length > 5">
                <a class="more">显示全部 +</a>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :xs="24" :sm="16" :md="16" :lg="16">
          <div class="panel">
            <div ref="readyChart" class="ready-chart"></div>
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
        .ready-chart {
          height: 300px;
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
        ready: null,
      };
    },
    mounted() {
//      const categories = [];
//      const currentTime = new Date().getTime();
//      const half = 30 * 60 * 1000;
//      const diff = 5 * 60 * 1000;
//      const minTime = currentTime - half;
//      let tempTime;
//      for (let i = 0; i < 6; i += 1) {
//        tempTime = i * diff;
//        console.log(minTime, tempTime);
//        console.log(minTime + tempTime);
//        categories.push(minTime + tempTime);
//      }
//      console.log(categories);
      axios({
        method: 'GET',
        url: 'http://localhost:3034/ajax',
      }).then((json) => {
        this.ready = json.data;
        const seriesData = [];
        this.ready.forEach((item) => {
          seriesData.push({
            color: 'rgba(50, 173, 250, 1)',
            data: [0, 10, 20, 40, 80],
            lineWidth: 0,
            name: item.name,
          });
        });
        highcharts.chart(this.$refs.readyChart, {
          chart: {
            type: 'area',
            backgroundColor: 'transparent',
          },
          credits: {
            enabled: false,
          },
          series: seriesData,
          title: {
            align: 'left',
            style: {
              fontSize: '14px',
              color: '#F8F8F8',
            },
            text: '平均时间',
          },
          xAxis: {
            categories: ['14:05', '14:10', '14:15', '14:20', '14:25'],
            labels: {
              style: {
                color: '#F8F8F8',
              },
            },
            tickmarkPlacement: 'on',
            title: {
              enabled: false,
            },
          },
          yAxis: {
            gridLineColor: 'rgba(0, 0, 0, 0.1)',
            labels: {
              style: {
                color: '#F8F8F8',
              },
            },
            title: {
              text: null,
            },
          },
          legend: {
            itemWidth: 150,
            itemHoverStyle: {
              fontWeight: 'bold',
              color: '#F8F8F8',
            },
            itemMarginTop: 5,
            itemStyle: {
              fontWeight: 'normal',
              color: '#F8F8F8',
            },
            symbolWidth: 12,
            symbolHeight: 8,
            symbolRadius: 0,
            squareSymbol: false,
          },
        });
      });
    },
  };
</script>
