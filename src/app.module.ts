import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PageModule } from './page/page.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PageModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
