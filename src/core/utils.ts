import { createSSRApp,Component }                                                      from "vue";
import { createMemoryHistory, createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";

/**
 * 创建路由和实例
 */
export const createApp = (App:Component, routes:Array<RouteRecordRaw> = [], browser = false) => {
  if (!App) {
    throw new Error("required parameter missing : App ");
  }
  let router: undefined | Router = undefined ;

  const app = createSSRApp(App);

    router = createRouter({
      routes: routes,
      history: browser ? createWebHistory() : createMemoryHistory()
    });
    app.use(router);

  return {
    app,
    router
  };

};


/**
 * 替换
 */
export const replaceAll = (text: string, searchValue: string | RegExp = "", replaceValue = ""):string => {
    return text.replace(new RegExp(searchValue, "gm"), replaceValue);
};


export const normalizeAssets = (assets) => {
  if (typeof assets === "object" && assets !== null) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
};
