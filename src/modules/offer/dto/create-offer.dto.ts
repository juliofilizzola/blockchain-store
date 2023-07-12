import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOfferDto {
  @IsUUID('4', { message: 'uuid user is invalid' })
  @IsNotEmpty({ message: 'uuid user is required' })
  userId: string;

  @IsUUID('4', { message: 'uuid user is invalid' })
  @IsNotEmpty({ message: 'uuid wallet is required' })
  walletId: string;

  @IsString({ message: 'name has be string' })
  @IsNotEmpty({
    message: 'name is required',
  })
  name: string;

  @IsNotEmpty({ message: 'quantity is required' })
  @IsNumber({}, { message: 'quantity is number' })
  @IsPositive({ message: 'quantity cannot negative' })
  quantity: number;

  @IsNotEmpty({ message: 'price is required' })
  @IsNumber({}, { message: 'price is number' })
  @IsPositive({ message: 'price cannot negative' })
  price: number;

  @IsString({ message: 'description has be string' })
  @IsNotEmpty({
    message: 'description is required',
  })
  description: string;
}