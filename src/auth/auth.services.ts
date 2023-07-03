import { Injectable } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose'
import { Auth, AuthDocument } from "./schemas/auth.schema";
import { Model } from "mongoose";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt/dist";

@Injectable()
export class AuthServices {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private jwtService: JwtService,
  ) {}

  async register(body) {
    const {username, email, password} = body
    const user = await this.authModel.findOne({email: email})    
    if(user){
      return false
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new this.authModel({
      username,
      email,
      password: hashedPassword
    })
    await newUser.save()
    return this.createToken({id: newUser.id}) 
  }

  async login(body:LoginDto) {
    const user = await this.authModel.findOne({email: body.email})
    if(!user) {
      return false
    }
    return this.createToken({id: user.id})
  }

  async update(id:string, body:RegisterDto): Promise<Model<AuthDocument>> {
    return await this.authModel.findByIdAndUpdate(id, body, {new: true})
  }

  async remove(id:string): Promise<Model<AuthDocument>> {
    return await this.authModel.findByIdAndDelete(id)
  }

  createToken(payload) {
    return this.jwtService.sign(payload, {expiresIn: '10h'})
  }
}