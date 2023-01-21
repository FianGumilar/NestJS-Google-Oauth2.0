import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/models/auth.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/models/user.entity';
import { AuthService } from './auth/service/auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User],
      synchronize: true
  }),
  PassportModule.register({ session: true })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
