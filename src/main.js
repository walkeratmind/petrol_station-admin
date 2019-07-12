import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firestorePlugin } from "vuefire";

import NProgress from "nprogress";

// for progress bar while routing pages
import "../node_modules/nprogress/nprogress.css";

Vue.use(firestorePlugin);

Vue.config.productionTip = false;

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
