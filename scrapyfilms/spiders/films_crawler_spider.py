import scrapy
from datetime import datetime
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
        Rule(LinkExtractor(allow='/title/tt'), callback='parse_item', follow=False),
    ]
    
    def parse_item(self, response):
        yield {
            "title": response.css('h1>span::text').get(),
            "release_date": self.transformar_fecha(response.css('div.fVkLRr>ul>li[data-testid="title-details-releasedate"]>div>ul>li>a::text').get()),
            "brief_plot" : response.css('span.kJJttH::text').get(),
            "popular_cast": response.css('a.fUguci::text').getall(),
            "director": response.css('ul.iiDmgX>li>span:contains(Director)~div>ul li>a::text').getall(),
            "scriptwriter": response.css('ul.iiDmgX>li>span:contains(Writers)~div>ul li>a::text').getall(),
            "duration": self.runtime_calculator(response.css('li[data-testid="title-techspec_runtime"]>div::text').getall()),
            "production": response.css('li[data-testid="title-details-companies"]>div>ul>li>a::text').getall(),
            "original_country": response.css('li[data-testid="title-details-origin"]>div>ul>li>a::text').get(),
            "original_language": response.css('li[data-testid="title-details-languages"]>div>ul>li>a::text').get(),
            "parental_guide": response.css('a[href*="parentalguide"]::text').get(),
            "score": response.css('span.iZlgcd::text').get(),
            "poster_url": response.css('meta[property="og:image"]::attr(content)').get()
        }

    def transformar_fecha(self, fecha_str):
        try:
            date_without_country = fecha_str.split(" (")[0]

            # Define el formato original de la fecha
            formato_original = "%B %d, %Y"

            # Intenta analizar la fecha en el formato original
            fecha_obj = datetime.strptime(date_without_country, formato_original)

            # Formatea la fecha en el formato "dd/mm/aaaa"
            fecha_formateada = fecha_obj.strftime("%d/%m/%Y")

            return fecha_formateada
        except ValueError:
            return "NA"


    def runtime_calculator(self, duration_text_list):
        try:
            hours = int(0)

            if len(duration_text_list) == 7:
                hours = int(duration_text_list[0])
                minutes = int(duration_text_list[4])
            else:
                minutes = int(duration_text_list[0])

            hora_formateada = "{:02d}".format(hours)
            minuto_formateado = "{:02d}".format(minutes)

            hora_completa = hora_formateada + ":" + minuto_formateado

            return hora_completa
        except ValueError:
            return "NA"