import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret:
        'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
      signOptions: { expiresIn: '500s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
