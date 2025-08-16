import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync } from 'bcrypt';
import { FilterQuery, Model } from 'mongoose';
import { IAppConfig } from 'src/interface/config';
import { AdminSignInInput } from './dto/admin-sign-in-input';
import { CreateAdminUserInput } from './dto/create-admin-user.input';
import { UpdateAdminUserInput } from './dto/update-admin-user.input';
import {
  AdminUser,
  AdminUserDocument,
  ROLE,
} from './entities/admin-user.entity';

@Injectable()
export class AdminUsersService implements OnModuleInit {
  constructor(
    @InjectModel(AdminUser.name) private adminUserModel: Model<AdminUser>,
    private configService: ConfigService<IAppConfig>,
    private jwtService: JwtService,
  ) { }

  async onModuleInit() {
    Logger.log('Initializing Admin User...');
    await this.initializeAdminUser();
  }

  async create(createAdminUserInput: CreateAdminUserInput): Promise<AdminUser> {
    Logger.log(
      `Creating Admin User: ${createAdminUserInput.email}`,
      'createAdminUser',
    );
    const isExist = await this.adminUserModel.countDocuments({
      email: createAdminUserInput.email,
    });

    if (isExist > 0) {
      throw new Error('Email already exists');
    }

    const user = await this.adminUserModel.create({
      ...createAdminUserInput,
    });

    return { ...user?.toJSON(), password: undefined };
  }

  async initializeAdminUser() {
    const adminUserCount = await this.adminUserModel.countDocuments({
      role: ROLE.ADMIN,
    });
    Logger.log('Checking admin user count...', 'initializeAdmin');
    if (adminUserCount > 0) {
      Logger.log(
        'Admin user already exists, so skip the default admin user creation',
        'initializeAdmin',
      );
      return;
    }
    Logger.log('🚀 Creating default admin user...', 'initializeAdmin');
    const adminUser = await this.create({
      username: this.configService.get('ADMIN_USERNAME'),
      email: this.configService.get('ADMIN_EMAIL'),
      password: this.configService.get('ADMIN_PASSWORD'),
      role: ROLE.ADMIN,
      isActive: true,
    });
    Logger.log(
      `✅ Default admin user created: ${adminUser.email}`,
      'initializeAdmin',
    );
    return;
  }

  findAll(): Promise<AdminUser[]> {
    return this.adminUserModel.find().select('-password');
  }

  async get(id: string): Promise<AdminUserDocument> {
    const adminUser = await this.adminUserModel
      .findById(id)
      .select('-password');

    if (!adminUser) {
      throw new NotFoundException('Admin user not found');
    }

    return adminUser;
  }

  async findBy(filter: FilterQuery<AdminUser>) {
    try {
      const user = await this.adminUserModel.findOne({ ...filter }).exec();
      if (!user) {
        throw new NotFoundException(`Admin user not found`);
      }
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async update(id: string, updateAdminUserInput: UpdateAdminUserInput) {
    const user = await this.get(id);
    Object.assign(user, updateAdminUserInput);
    await user.save();
    return user;
  }

  remove(id: string) {
    return this.adminUserModel.findByIdAndDelete(id);
  }

  async signIn(
    signInInput: AdminSignInInput,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.findBy({ email: signInInput.email });

    const isPasswordValid = compareSync(signInInput.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('ADMIN_USER_REFRESH_TOKEN_EXP_TIME'),
      }),
    };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const newPayload = { sub: payload.sub, email: payload.email };
      return {
        accessToken: this.jwtService.sign(newPayload),
        refreshToken: this.jwtService.sign(newPayload, {
          expiresIn: this.configService.get(
            'ADMIN_USER_REFRESH_TOKEN_EXP_TIME',
          ),
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
