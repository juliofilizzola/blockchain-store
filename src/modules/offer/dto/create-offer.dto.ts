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

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty({ message: 'price is required' })
  @IsNumber({}, { message: 'price is number' })
  @IsPositive({ message: 'price cannot negative' })
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}