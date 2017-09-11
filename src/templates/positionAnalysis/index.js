/**
 * Created by NieFZ on 2017/5/9.
 */
import 'scss/base.scss';
import txlHeader from 'components/header/header';
import sideBar from 'components/side-bar/side-bar';
import routerConfig from 'config/routers.config.js';

Vue.use(txlHeader);
Vue.use(sideBar);
Vue.use(VueRouter);

const txl = new Vue({
  router: new VueRouter(routerConfig),
}).$mount('.txl');

export default { txl };