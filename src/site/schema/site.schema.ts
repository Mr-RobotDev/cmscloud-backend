import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Site extends Document {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({
    type: Number,
    required: true,
  })
  longitude: number;

  @Prop({
    type: Number,
    required: true,
  })
  latitude: number;

  @Prop({
    type: String,
    required: true,
  })
  siteId: string;

  @Prop({
    type: String,
    required: true,
  })
  customerName: string;

  @Prop({
    type: String,
    required: true,
  })
  url: string;

  @Prop({
    type: [String],
  })
  attachments?: string[];

  @Prop({
    type: String,
  })
  notesBox?: string;

  @Prop({
    type: String,
  })
  hostId?: string;

  @Prop({
    type: String,
  })
  platformUsername?: string;

  @Prop({
    type: String,
  })
  platformPassword?: string;

  @Prop({
    type: String,
  })
  stationUsername?: string;

  @Prop({
    type: String,
  })
  stationPassword?: string;

  @Prop({
    type: String,
  })
  systemPassphrase?: string;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
