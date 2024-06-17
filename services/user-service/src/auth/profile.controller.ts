import { Controller, Get, Req } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  @Get()
  getProfile(@Req() req) {
    const user = JSON.parse(req.query.user);
    return `
      <h1>User Profile</h1>
      <p>Name: ${user.firstName} ${user.lastName}</p>
      <p>Email: ${user.email}</p>
      <img src="${user.picture}" alt="Profile Picture" />
    `;
  }
}
