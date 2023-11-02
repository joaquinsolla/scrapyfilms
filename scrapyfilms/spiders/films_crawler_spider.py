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
        "https://www.imdb.com/chart/moviemeter/",
        "https://www.imdb.com/search/title/?title_type=feature&genres=action",
        "https://www.imdb.com/search/title/?title_type=feature&genres=adventure",
        "https://www.imdb.com/search/title/?title_type=feature&genres=animation",
        "https://www.imdb.com/search/title/?title_type=feature&genres=biography",
        "https://www.imdb.com/search/title/?title_type=feature&genres=comedy",
        "https://www.imdb.com/search/title/?title_type=feature&genres=crime",
        "https://www.imdb.com/search/title/?title_type=feature&genres=documentary",
        "https://www.imdb.com/search/title/?title_type=feature&genres=drama",
        "https://www.imdb.com/search/title/?title_type=feature&genres=family",
        "https://www.imdb.com/search/title/?title_type=feature&genres=fantasy",
        "https://www.imdb.com/search/title/?title_type=feature&genres=film-noir",
        "https://www.imdb.com/search/title/?title_type=feature&genres=history",
        "https://www.imdb.com/search/title/?title_type=feature&genres=horror",
        "https://www.imdb.com/search/title/?title_type=feature&genres=music",
        "https://www.imdb.com/search/title/?title_type=feature&genres=musical",
        "https://www.imdb.com/search/title/?title_type=feature&genres=mystery",
        "https://www.imdb.com/search/title/?title_type=feature&genres=romance",
        "https://www.imdb.com/search/title/?title_type=feature&genres=sci-fi",
        "https://www.imdb.com/search/title/?title_type=feature&genres=sport",
        "https://www.imdb.com/search/title/?title_type=feature&genres=thriller",
        "https://www.imdb.com/search/title/?title_type=feature&genres=war",
        "https://www.imdb.com/search/title/?title_type=feature&genres=western"
    ]

    rules = [
        Rule(LinkExtractor(allow='/title/tt'), callback='parse_item', follow=False),
    ]

    # item_count = 1

    def parse_item(self, response):
        try:
            # PARA OBTENER {"create": {"id": X}}
            # yield {"create": {"_id": self.item_count}}
            # self.item_count += 1

            yield {
                "title": response.css('h1>span::text').get(),
                "release_date": self.date_formatter(response.css('div.fVkLRr>ul>li[data-testid="title-details-releasedate"]>div>ul>li>a::text').get()),
                "brief_plot" : response.css('span.kJJttH::text').get(),
                "popular_cast": response.css('a.fUguci::text').getall(),
                "director": response.css('ul.iiDmgX>li>span:contains(Director)~div>ul li>a::text').getall(),
                "scriptwriter": response.css('ul.iiDmgX>li>span:contains(Writers)~div>ul li>a::text').getall(),
                "duration": self.duration_calculation(response.css('li[data-testid="title-techspec_runtime"]>div::text').getall()),
                "production": response.css('li[data-testid="title-details-companies"]>div>ul>li>a::text').getall(),
                "original_country": response.css('li[data-testid="title-details-origin"]>div>ul>li>a::text').get(),
                "original_language": response.css('li[data-testid="title-details-languages"]>div>ul>li>a::text').get(),
                "parental_guide": response.css('a[href*="parentalguide"]::text').get(),
                "score": self.score_calculation(response.css('span.iZlgcd::text').get()),
                "genre": self.get_genre(response.css('span.ipc-chip__text::text').get()),
                "poster_url": response.css('meta[property="og:image"]::attr(content)').get()
            }
        except Exception:
            pass

    def get_genre(self, genre):
        try:
            if genre == "Back to top":
                return "NA"
            else:
                return genre
        except ValueError:
            return "NA"

    def date_formatter(self, fecha_str):
        try:
            date_without_country = fecha_str.split(" (")[0]

            # Define el formato original de la fecha
            formato_original = "%B %d, %Y"

            # Intenta analizar la fecha en el formato original
            fecha_obj = datetime.strptime(date_without_country, formato_original)

            # Formatea la fecha en el formato "yyyy-MM-dd"
            fecha_formateada = fecha_obj.strftime("%Y-%m-%d")

            return fecha_formateada
        except ValueError:
            return "NA"

    def duration_calculation(self, duration_text_list):
        try:
            if len(duration_text_list) == 7:
                hours = int(duration_text_list[0])
                minutes = int(duration_text_list[4])

                duration = (60 * hours) + minutes
            else:
                if len(duration_text_list) == 3:
                    if duration_text_list[2] == "hour" or duration_text_list[2] == "hours":
                        duration = int(duration_text_list[0])*60
                    else:
                        duration = int(duration_text_list[0])
                else:
                    return "NA"

            return duration
        except ValueError:
            return "NA"

    def score_calculation(self, score_text):
        try:
            score = float(score_text)/2
            return score
        except ValueError:
            return "NA"
