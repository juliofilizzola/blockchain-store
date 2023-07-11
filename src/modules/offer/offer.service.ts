import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { currentDate, nextDate } from '../../../utils/date';
import { PaginationDto } from '../../../utils/pagination/dto/pagination.dto';
import { paginateResponse } from '../../../utils/pagination/pagination';

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
      throw new NotFoundException({
        message: 'user not found',
      });
    }

    const countOfferDay = await this.prismaService.offer.count({
      where: {
        wallet: {
          id: user.id,
        },
        createdAt: {
          lte: nextDate(),
          gte: currentDate(),
        },
      },
    });

    if (countOfferDay > 5) {
      throw new BadRequestException({
        message: 'user cannot create offer, limit exisd',
      });
    }

    const wallet = await this.prismaService.wallet.findFirst({
      where: {
        id: createOfferDto.walletId,
        user: {
          id: user.id,
        },
      },
    });

    if (!wallet) {
      throw new NotFoundException({
        message: 'wallet not found',
      });
    }

    if (
      !wallet.quantityToken ||
      createOfferDto.qunatity > wallet.quantityToken
    ) {
      throw new BadRequestException({
        message: 'wallet does not have enough token',
      });
    }

    return this.prismaService.offer.create({
      data: {
        wallet: {
          connect: {
            id: wallet.id,
          },
        },
        expiration: nextDate(),
        quantity: createOfferDto.qunatity,
        price: createOfferDto.price,
        name: createOfferDto.name,
        description: createOfferDto.description,
      },
    });
  }

  async findAll(pagination?: PaginationDto) {
    if (pagination) {
      const { limit, page } = pagination;

      const result = await this.prismaService.$transaction([
        this.prismaService.offer.count({
          where: {
            createdAt: {
              lte: nextDate(),
              gte: currentDate(),
            },
          },
        }),
        this.prismaService.offer.findMany({
          where: {
            createdAt: {
              lte: nextDate(),
              gte: currentDate(),
            },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
      ]);

      return paginateResponse(result, page, limit);
    }

    return this.prismaService.offer.findMany({
      where: {
        createdAt: {
          lte: nextDate(),
          gte: currentDate(),
        },
      },
    });
  }
  async findAllByUser(userId: string, pagination?: PaginationDto) {
    if (pagination) {
      const { limit, page } = pagination;

      const result = await this.prismaService.$transaction([
        this.prismaService.offer.count({
          where: {
            wallet: {
              user: {
                id: userId,
              },
            },
            createdAt: {
              lte: nextDate(),
              gte: currentDate(),
            },
          },
        }),
        this.prismaService.offer.findMany({
          where: {
            wallet: {
              user: {
                id: userId,
              },
            },
            createdAt: {
              lte: nextDate(),
              gte: currentDate(),
            },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
      ]);

      return paginateResponse(result, page, limit);
    }

    return this.prismaService.offer.findMany({
      where: {
        wallet: {
          user: {
            id: userId,
          },
        },
        createdAt: {
          lte: nextDate(),
          gte: currentDate(),
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.offer.findFirst({
      where: {
        id,
      },
    });
  }

  async remove(id: string, userId: string) {
    const offer = await this.prismaService.offer.findFirst({
      where: {
        id,
      },
      include: {
        wallet: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!offer) {
      throw new NotFoundException({
        message: 'offer not found',
      });
    }

    if (offer.wallet.user.id !== userId) {
      throw new BadRequestException({
        message: 'delete denied',
      });
    }

    return this.prismaService.offer.delete({
      where: {
        id,
      },
    });
  }
}