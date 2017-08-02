import sideBar from './side-bar.vue';

sideBar.install = (Vue) => {
  Vue.component(sideBar.name, sideBar);
};

export default sideBar;