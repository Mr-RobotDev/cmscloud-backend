import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getSiteById(id: string) {
    const site = await this.siteModel.findById(id);
    if (!site) {
      throw new NotFoundException('Site not found');
    }
    return site;
  }

  updateSite(id: string, update: UpdateQuery<Site>) {
    return this.siteModel.findByIdAndUpdate(id, update, { new: true });
  }
}
