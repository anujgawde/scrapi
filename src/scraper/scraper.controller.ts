import { Body, Controller, Post } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
  @Post('scrape-url')
  async scrapeURL(@Body() body: { url: string }) {
    return this.scraperService.scrapeUrl(body.url);
  }
}

// Body:
// URL
//
