// src/leave/schemas/leave.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Leave extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  employee: mongoose.Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop()
  reason: string;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
