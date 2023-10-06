from typing import Iterable
import scrapy
from scrapy.http import Request
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class FilmsCrawlerSpider(CrawlSpider):
    name = "no-scraper"
    allowed_domains = [
        'www.imdb.com'
    ]
    start_urls = [
        "https://www.imdb.com/chart/top/?ref_=nv_mv_250",
    ]

    rules = [
        Rule(LinkExtractor(allow='/title/tt'), callback='parse_item', follow=False)
    ]
    
    def parse_item(self, response):
        yield {
            "title": response.css('h1>span::text').get()
        }

    def start_requests(self) -> Iterable[Request]:
        for url in self.start_urls:
            yield Request(url)