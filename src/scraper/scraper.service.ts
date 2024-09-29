import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

// Note:
// In this example, textContent is the main data which is being extracted, and should be saved in the database ultimately.
// This can change as required, puppeteer allows a lot of different ways to scrape data

@Injectable()
export class ScraperService {
  visitedUrls: { [key: string]: boolean } = {};
  allLinks: string[] = [];

  // Main scraping function
  async scrapeUrl(url: string): Promise<string[]> {
    const browser = await puppeteer.launch();
    await this.scrapePage(browser, url);
    await browser.close();
    return this.allLinks;
  }

  // Recursive function to scrape a single page and follow links
  async scrapePage(browser: any, url: string) {
    // Check if the URL has already been visited
    if (this.visitedUrls[url]) {
      console.log(`Already visited: ${url}`);
      return;
    }

    // Mark the URL as visited
    this.visitedUrls[url] = true;
    console.log(`Scraping: ${url}`);

    // Open a new page
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Extract the text content of the page
    const textContent = await page.evaluate(() => document.body.innerText);
    console.log(`Content from ${url}:`, textContent);

    // Extract all anchor tags and their href attributes
    const pageLinks: string[] = await page.evaluate(() => {
      const anchorTags = Array.from(document.querySelectorAll('a'));

      return anchorTags
        .map((anchor: HTMLAnchorElement) => anchor.href)
        .filter((href: string) => href);
    });
    await page.close();

    // Add the links to the allLinks array
    this.allLinks.push(
      ...pageLinks.filter(
        (element) => element.startsWith(url) && !this.allLinks[element],
      ),
    ); // Spread operator to add links

    // Recursively visit and scrape each link found on the page
    for (const link of pageLinks) {
      // Only visit links that haven't been visited
      if (link.startsWith(url) && !this.visitedUrls[link]) {
        await this.scrapePage(browser, link);
      }
    }
  }
}
