import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
