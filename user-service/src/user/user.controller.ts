import { Controller } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.register(createUserDto);
  // }

  // @Post('login')
  // async login(@Body() loginUserDto: CreateUserDto) {
  //   const user = await this.authService.validateUser(
  //     loginUserDto.username,
  //     loginUserDto.password,
  //   );
  //   if (!user) {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   }
  //   return this.authService.login(user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return this.userService.findOne(req.user.userId);
  // }
}
