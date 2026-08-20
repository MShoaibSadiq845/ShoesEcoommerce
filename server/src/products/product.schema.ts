import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'FOOTWEAR', uppercase: true })
  category: string;

  @Prop({ default: '/images/4.png' })
  imageUrl: string;

  @Prop({ default: 'NEW' })
  tag: string;

  @Prop({ default: 'NIKE', uppercase: true })
  brand: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
