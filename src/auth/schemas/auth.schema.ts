import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AuthDocument = HydratedDocument<Auth>

@Schema()
export class Auth {
  @Prop()
  username:string
  @Prop()
  email:string
  @Prop()
  password:string
}

export const authSchema = SchemaFactory.createForClass(Auth);