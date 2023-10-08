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
            "duration": self.runtime_calculator(response.css('li[data-testid="title-techspec_runtime"]>div::text').getall()),
            "proudction": response.css('li[data-testid="title-details-companies"]>div>ul>li>a::text').getall(),
            "original_country": response.css('li[data-testid="title-details-origin"]>div>ul>li>a::text').get(),
            "languages": response.css('li[data-testid="title-details-languages"]>div>ul>li>a::text').get(),
            "parental_quide": response.css('a[href*="parentalguide"]::text').get(),
            "score": response.css('span.iZlgcd::text').get()
        }

    def runtime_calculator(runtime_as_list: list):
        runtime_list_modified = [item for item in runtime_as_list if item == ' ']
        if len(runtime_list_modified) == 4:
            if runtime_list_modified[1] == "hours" and runtime_list_modified[3] == "minutes":
                return int(runtime_list_modified[0]) * 60 + int(runtime_list_modified[2])
            else:
                raise Exception('Unexpected runtime given', runtime_as_list)
        elif len(runtime_list_modified) == 2:
            if runtime_list_modified[1] == "minutes":
                return int(runtime_list_modified[0])
            elif runtime_list_modified[1] == "hours":
                return int(runtime_list_modified[0]) * 60
            else:
                raise Exception('Unexpected runtime given', runtime_as_list)