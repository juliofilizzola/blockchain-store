import { MethodPaymant } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreatePurchaseDto {
  @IsUUID('4', { message: 'uuid user is invalid' })
  @IsNotEmpty({ message: 'uuid user is required' })
  userId: string;

  @IsUUID('4', { message: 'uuid offer is invalid' })
  @IsNotEmpty({ message: 'uuid offer is required' })
  offerId: string;

  @IsInt({
    message: 'quantity has be int',
  })
  @IsPositive({
    message: 'quantity has be positive',
  })
  quantity: number;

  @IsInt({
    message: 'amount has be int',
  })
  @IsPositive({
    message: 'amount has be positive',
  })
  amount: number;

  @IsEnum(MethodPaymant)
  @IsNotEmpty({
    message: 'method payment is required',
  })
  methodPayment: MethodPaymant;
}