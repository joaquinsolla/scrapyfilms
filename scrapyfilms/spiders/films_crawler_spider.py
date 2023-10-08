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
            "title": response.css('h1>span::text').get(),
            "release_date": response.css('div.fVkLRr>ul>li[data-testid="title-details-releasedate"]>div>ul>li>a::text').get(),
            "brief_plot" : response.css('span.kJJttH::text').get(),
            "popular_cast": response.css('a.fUguci::text').getall(),
            "director": response.css('ul.iiDmgX>li>span:contains(Director)~div>ul li>a::text').getall(),
            "scripters": response.css('ul.iiDmgX>li>span:contains(Writers)~div>ul li>a::text').getall(),
            ## Incompleto:
            "duration": response.css('ul.kdXikI li>a').get(),
        }

    def start_requests(self) -> Iterable[Request]:
        for url in self.start_urls:
            yield Request(url)