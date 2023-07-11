import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OfferService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createOfferDto: CreateOfferDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: createOfferDto.userId,
      },
    });

    if (!user) {
      throw new BadRequestException();
    }

    const wallet = await this.prismaService.wallet.findFirst({
      where: {
        id: createOfferDto.walletId,
      },
    });

    if (!wallet) {
      throw new BadRequestException();
    }

    if (createOfferDto.price > wallet.balance) {
      throw new BadRequestException();
    }

    return this.prismaService.offer.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        price: createOfferDto.price,
        name: createOfferDto.name,
        description: createOfferDto.description,
      },
    });
  }

  findAll() {
    return 'This action returns all offer';
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}