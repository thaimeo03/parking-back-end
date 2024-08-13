import { IsMatchPassword } from '@app/common/decorators/validation.de'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsMatchPassword('password', { message: 'password do not match' })
  confirmPassword: string
}
