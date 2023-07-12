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

    if (offer.expiration > new Date(nextDate()) || !offer.active) {
      throw new BadRequestException({
        message: 'offer invalid',
      });
    }

    if (createPurchaseDto.quantity > offer.quantity) {
      throw new BadRequestException({
        message: 'quantity above available',
      });
    }

    const wallet = await this.prismaService.wallet.findFirst({
      where: {
        id: createPurchaseDto.walletId,
      },
    });

    if (!wallet) {
      throw new NotFoundException({
        message: 'wallet not found',
      });
    }

    if (wallet.typeToken != offer.wallet.typeToken) {
      throw new BadRequestException({
        message: 'wallet token invalid',
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
          quantityToken:
            offer.wallet.quantityToken - createPurchaseDto.quantity,
        },
      });

      await prisma.wallet.update({
        where: {
          id: wallet.id,
        },
        data: {
          quantityToken: createPurchaseDto.quantity,
        },
      });

      return prisma.purchase.create({
        data: {
          user: {
            connect: {
              id: wallet.userId,
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