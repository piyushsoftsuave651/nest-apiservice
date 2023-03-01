import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(public readonly appService: AppService) {}
  @Post('addUser')
  insertData(@Body() userDetails: any): Promise<any> {
    try {
      return this.appService.insertData('adduser', userDetails);
    } catch (error) {
      throw error.message;
    }
  }
  @Get('getUser/:id')
  getData(@Param() param: any): any {
    return this.appService.getData('getuser', param.id);
  }
  @Patch('updateUser/:userId')
  updateData(@Body() userDetails: any, @Param() param: any): any {
    return this.appService.updateData('updateuser', {
      userId: param.userId,
      userDetails,
    });
  }

  @Delete('deleteUser/:userId')
  deleteData(@Param() param: any): any {
    return this.appService.deleteUser('deleteuser', param.userId);
  }

  @Post('addCheckin/:userId')
  addCheckin(@Param() param: any): any {
    return this.appService.addCheckin('usercheckin', param.userId);
  }

  @Get('getCheckin/:userId')
  getCheckins(@Param() param: any): any {
    return this.appService.getCheckins('getcheckins', param.userId);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
