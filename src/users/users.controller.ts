/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth-guard.guard';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 4) {
    return this.userService.getUsers(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  //@UseGuards(AuthGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    console.log(id);
    return this.userService.getUser(id);
  }

  // @Post()
  // createUser(@Body() user: CreateUserDto) {
  //   return this.userService.createUser(user);
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
