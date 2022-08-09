import { LoggerMiddleware }                       from "@/middware/logger";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController }                          from '@/controller/app';
import { AppService }                        from '@/service/app';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements  NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
  }

}
