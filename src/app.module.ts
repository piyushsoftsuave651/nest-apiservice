import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserMiddleware } from './users/user.middleware';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'users',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8878,
        },
      },
      {
        name: 'userCheckins',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 8877,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('addUser', 'updateUser');
  }
}
