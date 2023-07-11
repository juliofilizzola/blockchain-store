import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { PaginationDto } from '../../../utils/pagination/dto/pagination.dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  findAll(@Query() { page, limit }: PaginationDto) {
    const pagination: PaginationDto =
      page && limit ? { page: Number(page), limit: Number(limit) } : undefined;
    return this.offerService.findAll(pagination);
  }

  @Get('/byUser/:userId')
  findAllByUserId(
    @Param('userId') userId: string,
    @Query() { page, limit }: PaginationDto,
  ) {
    const pagination: PaginationDto =
      page && limit ? { page: Number(page), limit: Number(limit) } : undefined;
    return this.offerService.findAllByUser(userId, pagination);
  }

  @Get('all/:id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(id);
  }

  @Delete('remove/:id/:userId')
  remove(@Param('id') id: string, @Param('userId') userId: string) {
    return this.offerService.remove(id, userId);
  }
}