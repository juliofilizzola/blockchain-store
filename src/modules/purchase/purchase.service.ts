import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { nextDate } from '../../../utils/date';

@Injectable()
export class PurchaseService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPurchaseDto: CreatePurchaseDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: createPurchaseDto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'user not found',
      });
    }

    const offer = await this.prismaService.offer.findFirst({
      where: {
        id: createPurchaseDto.offerId,
      },
      include: {
        wallet: true,
      },
    });

    if (!offer) {
      throw new NotFoundException({
        message: 'offer not found',
      });
    }

    if (offer.expiration.toString() > nextDate() || !offer.active) {
      throw new BadRequestException({
        message: 'offer invalid',
      });
    }

    if (createPurchaseDto.quantity > offer.quantity) {
      throw new BadRequestException({
        message: 'quantity above available',
      });
    }

    return this.prismaService.$transaction(async (prisma) => {
      if (createPurchaseDto.quantity === offer.quantity) {
        await prisma.offer.update({
          where: {
            id: offer.id,
          },
          data: {
            active: false,
            quantity: 0,
          },
        });
      } else {
        await prisma.offer.update({
          where: {
            id: offer.id,
          },
          data: {
            quantity: offer.quantity - createPurchaseDto.quantity,
          },
        });
      }

      await prisma.wallet.update({
        where: {
          id: offer.wallet.id,
        },
        data: {
          balance: offer.wallet.balance + createPurchaseDto.amount,
        },
      });

      return prisma.purchase.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          amountPaid: createPurchaseDto.amount,
          quantity: createPurchaseDto.quantity,
          methodPayment: createPurchaseDto.methodPayment,
          offer: {
            connect: {
              id: offer.id,
            },
          },
        },
      });
    });
  }
}