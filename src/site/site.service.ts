import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Site } from './schema/site.schema';

@Injectable()
export class SiteService {
  constructor(
    @InjectModel(Site.name)
    private readonly siteModel: Model<Site>,
  ) {}

  sites() {
    return this.siteModel.find();
  }

  updateSite(id: string, update: UpdateQuery<Site>) {
    return this.siteModel.findByIdAndUpdate(id, update, { new: true });
  }
}
