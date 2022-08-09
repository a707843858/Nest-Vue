import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule }         from "@/module/app";
import nestVue from "@/core/nestVue";
import App     from 'src/pages/App.vue'


async function bootstrap() {
  const app:INestApplication = await NestFactory.create(AppModule);
  app.use(nestVue({application:app,App}))
  await app.listen(80);
}

bootstrap().catch(err => {
  console.error(err)
});
