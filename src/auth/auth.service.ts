import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './users/user.entity';
import { UsersRepository } from './users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './model/jwt-token.model';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(User) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUpUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt(10); // generate salt with key value or (rounds) as 10
    const hashedPassword = await bcrypt.hash(password, salt); // hashing password
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(error);
      // if duplicate user exists, then code 23505 is thrown
      if (error.code === '23505') {
        // throws exception with message to client in response
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signInUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    // find user from db, if found then compare it with username and password
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });

    // extract username from payload
    // signin using jwt and then return accessToken as object
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('User not found');
    }
  }
}
