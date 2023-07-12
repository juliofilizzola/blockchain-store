import { MethodPaymant } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreatePurchaseDto {
  @IsUUID('4', { message: 'uuid offer is invalid' })
  @IsNotEmpty({ message: 'uuid offer is required' })
  offerId: string;

  @IsUUID('4', { message: 'uuid wallet is invalid' })
  @IsNotEmpty({ message: 'uuid wallet is required' })
  walletId: string;

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