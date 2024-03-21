import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SiteService } from './site.service';
import { MediaService } from '../media/media.service';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Folder } from '../common/enums/folder.enum';

@Controller({
  path: 'sites',
  version: '1',
})
export class SiteController {
  constructor(
    private readonly siteService: SiteService,
    private readonly mediaService: MediaService,
  ) {}

  @Get()
  sites() {
    return this.siteService.sites();
  }

  @Put(':site/upload-attachments')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadVideos(
    @Param('site') site: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const attachments = await Promise.all(
      files.map((file) =>
        this.mediaService.uploadFile(file, Folder.ATTACHMENTS),
      ),
    );
    await this.siteService.updateSite(site, { $addToSet: { attachments } });
    return { attachments };
  }

  @Patch(':site')
  updateSite(
    @Param('site') site: string,
    @Body() updateSiteDto: UpdateSiteDto,
  ) {
    return this.siteService.updateSite(site, updateSiteDto);
  }
}
