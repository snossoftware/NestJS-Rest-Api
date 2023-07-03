import { Body, Controller, Post, Delete, Param, Put } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthServices } from "./auth.services";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private services: AuthServices) {}

  @Post('/register')
  register(@Body() body:RegisterDto) {
    return this.services.register(body)
  }

  @Post('/login')
  login(@Body() body:LoginDto) {
    return this.services.login(body)
  }

  @Put(':id')
  update(@Param('id') id:string,@Body() body:RegisterDto) {
    return this.services.update(id, body)
  }
  @Delete(':id')
  remove(@Param('id') id:string) {
    return this.services.remove(id)
  }
}