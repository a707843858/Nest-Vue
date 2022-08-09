import { createApp, normalizeAssets }                                 from "@/core/utils";
import { INestApplication }                                           from "@nestjs/common";
import { renderToString }                                             from "@vue/server-renderer";
import { Express, NextFunction, Request, Response as OriginResponse } from "express";
import { Component }                                                  from "vue";
import { RouteRecordRaw }                                             from "vue-router";
import { webpack }                                                    from "webpack";
import * as webpackDevMiddleware                                      from "webpack-dev-middleware";
import WebpackConfig from "./webpack.config";

/**
 * 添加 Vue SSR
 */
export function nestVue(args: NestVueArgs) {
  const { application, App, routes = [] } = args;
  const compiler = webpack(WebpackConfig({ entry: "/src/client.ts" }));
  application.use(webpackDevMiddleware(compiler, { serverSideRender: true }));

  return (req: Request, res: Response, next: NextFunction) => {

    res.renderToString = async () => {
      const { app, router } = createApp(App, routes);
      if (router) {
        app.use(router);
      }

      const appContext = await renderToString(app);


      /* 解析客户端文件 */
      let assetsByChunkName = { main: undefined };
      if (res) {
        const { devMiddleware } = res.locals.webpack;
        const jsonWebpackStats = devMiddleware.stats.toJson();
        assetsByChunkName = jsonWebpackStats.assetsByChunkName;
      }

      /* 模板 */
      const html = ` <html lang="en">
        <body>
          <div id="app">${appContext}</div>
          ${assetsByChunkName?.main ? normalizeAssets(assetsByChunkName.main)
        .filter((path) => path.endsWith(".js"))
        .map((path) => `<script src="/${path}"></script>`)
        .join("\n") : ""}
        </body>
      </html>`;
      res.send(html);
    };

    next();
  };
}

export interface NestVueArgs {

  /* 应用主体 例如 Express  */
  application: Express | INestApplication;

  /* 入口组件 */
  App: Component;

  /* 路由 */
  routes?: Array<RouteRecordRaw>;
}

export interface Response extends OriginResponse {
  /* 返回页面 */
  renderToString: (
    /* 路由路径 */
    path: string
  ) => void;
}


export default nestVue;
