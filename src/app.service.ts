import { Inject, Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('users') private readonly usersService: ClientProxy,
    @Inject('userCheckins') private readonly userCheckinsService: ClientProxy,
  ) {}

  async insertData(message: string, userDetails: any): Promise<any> {
    return await this.usersService.send(message, userDetails);
  }

  async updateData(message: string, userDetails: any): Promise<any> {
    return await this.usersService.send(message, userDetails);
  }

  async getData(message: string, userId: any): Promise<any> {
    return await this.usersService.send(message, userId);
  }

  async deleteUser(message: string, userId: any): Promise<any> {
    await this.usersService.send(message, userId);
    await this.userCheckinsService.send('deletecheckins', userId);
    return 'user deleted successfully';
  }

  async getCheckins(message: string, userId: any): Promise<any> {
    return await this.userCheckinsService.send(message, userId);
  }

  async addCheckin(message: string, userId: any): Promise<any> {
    const userExists: any = await this.usersService.send('getuser', userId);
    if (userExists == 'user not found') return "user doesn't exist";
    return await this.userCheckinsService.send(message, userId);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
