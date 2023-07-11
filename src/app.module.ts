import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OfferModule } from './modules/offer/offer.module';
import { ConfigModule } from '@nestjs/config';
import { PurchaseModule } from './modules/purchase/purchase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    OfferModule,
    PurchaseModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}