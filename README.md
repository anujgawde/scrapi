## Scrapi

Scrapi is a simple open-source URL-Scraper. This web scraper allows you to provide a base URL, and it will recursively traverse and scrape all related URLs from the given website. It starts by visiting the provided base URL, collecting all links on the page, and continuing to traverse through each link until the entire website has been scraped. The scraper efficiently handles multiple pages and ensures every page is visited only once. Ideal for gathering large datasets or analyzing the structure of web content.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Steps to use Scrapi

1. Install the dependencies and run the project.
2. Send a POST request to '/scraper/scrape-url' with your desired URL (Note: Send a base URL - without any subsections, to avoid scraping only specific sections of the website)
3. Make changes according to your requirements in the scrapePage method (which is a part of scraper.service.ts) to extract and save the data in your database.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Stay in touch

- Author - [Anuj Gawde](https://x.com/axgdevv)
