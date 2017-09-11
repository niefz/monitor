/**
 * Created by NieFZ on 2017/5/9.
 */

export default {
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/white',
      name: 'white',
      component: white => require.ensure([], (require) => {
        white(require('templates/performance/white.vue'));
      }, 'white'),
    },
    {
      path: '/first',
      name: 'first',
      component: first => require.ensure([], (require) => {
        first(require('templates/performance/first.vue'));
      }, 'first'),
    },
    {
      path: '/start',
      name: 'start',
      component: start => require.ensure([], (require) => {
        start(require('templates/performance/start.vue'));
      }, 'start'),
    },
    {
      path: '/ready',
      name: 'ready',
      component: ready => require.ensure([], (require) => {
        ready(require('templates/performance/ready.vue'));
      }, 'ready'),
    },
    {
      path: '/ajax',
      name: 'ajax',
      component: ajax => require.ensure([], (require) => {
        ajax(require('templates/performance/ajax.vue'));
      }, 'ajax'),
    },
  ],
};