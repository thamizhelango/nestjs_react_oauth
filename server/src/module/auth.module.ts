import { Module, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../service/auth.service';
import { UserModule } from '../module/user.module';
import { Oauth2Strategy } from '../security/passport.oauth2.strategy';
import { UserOauth2Controller } from '../web/rest/user.oauth2.controller';
import { AuthorityRepository } from '../repository/authority.repository';

import { PublicUserController } from '../web/rest/public.user.controller';
import { AccountController } from '../web/rest/account.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorityRepository]), UserModule, PassportModule, HttpModule],
  controllers: [UserOauth2Controller, PublicUserController, AccountController],
  providers: [AuthService, Oauth2Strategy],
  exports: [AuthService],
})
export class AuthModule {}
