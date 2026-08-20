import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ _id: false })
export class OrderItem {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  itemTotal: number;

  @Prop({ default: '/images/4.png' })
  imageUrl: string;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ type: [OrderItem], default: [] })
  items: OrderItem[];

  @Prop({ required: true, type: Number })
  totalAmount: number;

  @Prop({ default: 'PLACED' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
