import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { Site } from './schema/site.schema';
import { CreateSiteDto } from './dto/create-site.dto';

@Injectable()
export class SiteService {
  constructor(
    @InjectModel(Site.name)
    private readonly siteModel: Model<Site>,
  ) {}

  createSite(createSiteDto: CreateSiteDto) {
    return this.siteModel.create(createSiteDto);
  }

  sites() {
    return this.siteModel.find();
  }

  updateSite(id: string, update: UpdateQuery<Site>) {
    return this.siteModel.findByIdAndUpdate(id, update, { new: true });
  }
}
