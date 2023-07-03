import {Module} from '@nestjs/common'
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.services';
import {MongooseModule} from '@nestjs/mongoose'
import { Auth, authSchema } from './schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import {ConfigService} from '@nestjs/config'

@Module({
  imports: [
    MongooseModule.forFeature([{name: Auth.name, schema: authSchema}]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY')
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthServices,
    JwtStrategy
  ]
})
export class AuthModule {}