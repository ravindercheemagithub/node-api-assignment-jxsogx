import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { ErrorCode } from 'src/constants/error';
import { Repository } from 'typeorm';
import { CurrencyServiceException } from './../core/exception/currency-service.exception';
import { SignupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger,
  ) {}

  private async hasify(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async createUser(signupDto: SignupDto): Promise<void> {
    const { username, firstname, lastname, password } = signupDto;

    const hashedPassword = await this.hasify(password);

    const user = this.userRepository.create({
      username,
      firstname,
      lastname,
      password: hashedPassword,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.detail.includes('already exists')) {
        //throw new ConflictException('Username already exists');
        // above or via Custom exception
        throw new CurrencyServiceException(
          {
            errorCode: ErrorCode.UserNameExists.CODE,
            message: ErrorCode.UserNameExists.MESSAGE,
          },
          409,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOne(username: string): Promise<User> {
    if (!username) {
      return null;
    }
    return await this.userRepository.findOne({ where: { username } });
  }

  async find(username: string): Promise<User[]> {
    return await this.userRepository.find({ where: { username } });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userRepository.remove(user);
  }
}
