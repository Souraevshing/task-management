import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign Up User' })
  @ApiBearerAuth()
  @Post('/signup')
  signUpUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUpUser(authCredentialsDto);
  }

  // returning accessToken as object after successful login
  @ApiOperation({ summary: 'Sign In User' })
  @ApiBearerAuth()
  @Post('/signin')
  signInUser(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signInUser(authCredentialsDto);
  }
}
