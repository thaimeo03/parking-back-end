import { Controller, Get } from '@nestjs/common'

@Controller('hello-world')
export class HelloWorldController {
  @Get()
  getHello(): string {
    return 'Hello World!'
  }
}
