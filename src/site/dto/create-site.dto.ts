export class CreateSiteDto {
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  siteId: string;
  customerName: string;
  attachments?: string[];
  notesBox?: string;
  hostId?: string;
  platformUsername?: string;
  platformPassword?: string;
  stationUsername?: string;
  stationPassword?: string;
  systemPassphrase?: string;
}
