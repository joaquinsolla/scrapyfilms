import React from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent as Banner } from './assets/banner.svg';

import {
    Row,
    Col,
    Card,
} from 'antd';

import {
    ReactiveBase,
    DataSearch,
    SelectedFilters,
    ReactiveList,
    DateRange,
    RangeInput,
    MultiList,
    RatingsFilter
} from "@appbaseio/reactivesearch";

import createDOMPurify from 'dompurify';

const DOMPurify = createDOMPurify(window);

function getNestedValue(obj, path) {
    const keys = path.split('.');
    const nestedValue = keys.reduce((value, key) => {
        if (value) {
            return value[key];
        }
        return '';
    }, obj);
    if (typeof nestedValue === 'object') {
        return JSON.stringify(nestedValue);
    }
    return nestedValue;
}

function RenderFilm(res) {

    let {title, poster_url, score, release_date, brief_plot, director, popular_cast, scriptwriter, duration, production,
        original_country, original_language, parental_guide, genre/*, _score*/} = {
        "title": "title", "poster_url": "poster_url", "score": "score", "release_date": "release_date", "brief_plot": "brief_plot",
        "director": "director", "popular_cast": "popular_cast", "scriptwriter": "scriptwriter",  "duration": "duration",
        "production": "production", "original_country": "original_country", "original_language": "original_language",
        "parental_guide": "parental_guide", "genre": "genre", /*"_score": "_score", */"showRest": false
    };
    title = getNestedValue(res, title)
    poster_url = getNestedValue(res, poster_url)
    score = getNestedValue(res, score)
    release_date = getNestedValue(res, release_date)
    brief_plot = getNestedValue(res, brief_plot)
    director = getNestedValue(res, director)
    popular_cast = getNestedValue(res, popular_cast)
    scriptwriter = getNestedValue(res, scriptwriter)
    duration = getNestedValue(res, duration)
    production = getNestedValue(res, production)
    original_country = getNestedValue(res, original_country)
    original_language = getNestedValue(res, original_language)
    parental_guide = getNestedValue(res, parental_guide)
    genre = getNestedValue(res, genre)
    // _score = getNestedValue(res, _score)

    if (director === "[]") {
        director = "Sin información"
    } else {
        director = director.replace(/"/g, ' ').slice(1, -1).split(' ,');
    }
    if (scriptwriter === "[]") {
        scriptwriter = "Sin información"
    } else {
        scriptwriter = scriptwriter.replace(/"/g, ' ').slice(1, -1).split(' ,');
    }
    if (popular_cast === "[]") {
        popular_cast = "Sin información"
    } else {
        popular_cast = popular_cast.replace(/"/g, ' ').slice(1, -1).split(' ,');
    }
    if (production === "[]") {
        production = "Sin información"
    } else {
        production = production.replace(/"/g, ' ').slice(1, -1).split(' ,');
    }

    function toggleDetails() {
        const detailsDiv = document.getElementById("details_"+title);
        const detailsButton = document.getElementById("detailsButton_"+title);

        if (detailsDiv.style.display === "none" || detailsDiv.style.display === "") {
            detailsDiv.style.display = "block";
            detailsButton.innerHTML = "&nbsp;Ocultar"
        } else {
            detailsDiv.style.display = "none";
            detailsButton.innerHTML = "&nbsp;Mostrar"
        }
    }

    return (
        <Row type="flex" gutter={16} key={res._id}
             style={{margin: '20px auto', borderBottom: '1px solid #ededed'}}>
            <Col>
                {poster_url && <img width={150} src={poster_url} alt={title}/>}
            </Col>
            <Col span={17}>
                <p style={{fontSize: '1.2em', fontWeight: 'bold'}}
                   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(title)}}/>
                <p style={{fontSize: '1em'}}
                   dangerouslySetInnerHTML={{__html: "Lanzamiento: " + DOMPurify.sanitize(release_date) + " (" + DOMPurify.sanitize(original_country) + ")"}}/>
                <p style={{fontSize: '1em'}}
                   dangerouslySetInnerHTML={{__html: "Duración: " + DOMPurify.sanitize(duration) + " minutos"}}/>
                <p style={{fontSize: '1em'}}
                   dangerouslySetInnerHTML={{__html: "Género: " + DOMPurify.sanitize(genre)}}/>
                <p style={{fontSize: '1em', fontWeight: 'bold'}}>
                    Argumento
                </p>
                <p style={{fontSize: '0.8em'}}
                   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(brief_plot)}}/>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <p style={{fontSize: '1em', fontWeight: 'bold', userSelect: 'none'}}>Detalles técnicos <a id={"detailsButton_"+title} onClick={toggleDetails} style={{fontSize: '0.8em', fontWeight: 'normal'}}>&nbsp;Mostrar</a></p>
                <div id={"details_" + title} style={{ display: "none" }}>
                    <p style={{fontSize: '0.8em'}}
                       dangerouslySetInnerHTML={{__html: "Dirección: " + DOMPurify.sanitize(director)}}/>
                    <p style={{fontSize: '0.8em'}}
                       dangerouslySetInnerHTML={{__html: "Guionistas: " + DOMPurify.sanitize(scriptwriter)}}/>
                    <p style={{fontSize: '0.8em'}}
                       dangerouslySetInnerHTML={{__html: "Reparto principal: " + DOMPurify.sanitize(popular_cast)}}/>
                    <p style={{fontSize: '0.8em'}}
                       dangerouslySetInnerHTML={{__html: "Producción: " + DOMPurify.sanitize(production)}}/>
                    <p style={{fontSize: '0.8em'}}
                       dangerouslySetInnerHTML={{__html: "Idioma original: " + DOMPurify.sanitize(original_language)}}/>
                </div>
            </Col>
            <Col span={3}>
                <div style={{textAlign: "right"}}>
                    <p style={{fontSize: '1em', fontWeight: 'bold'}}>
                        Valoración
                    </p>
                    <p style={{fontSize: '2em'}}
                       dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(score + "/5")}}/>
                </div>
                <div style={{textAlign: "right"}}>
                    <p style={{fontSize: '1em', fontWeight: 'bold'}}>
                        Parental
                    </p>
                    <p style={{fontSize: '1.5em'}}
                       dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(parental_guide)}}/>
                </div>
            </Col>
        </Row>
    );
}

const App = () => (
    <ReactiveBase
        app="scrapyfilms_index"
        url="http://localhost:9200"
    >
        <Row style={{padding: 20}}>
            <Col id={"filters"} span={5}>
                <Card>
                    <div style={{marginBottom: 20}}>
                        <Banner />
                    </div>

                    <DateRange
                        componentId="ReleaseDate"
                        dataField="release_date"
                        title="Fecha de lanzamiento (aaaa-mm-dd)"
                        placeholder={{
                            start: 'Inicio intervalo',
                            end: 'Fin intervalo'
                        }}
                        focused={false}
                        numberOfMonths={1}
                        queryFormat="date"
                        showClear={true}
                        filterLabel="Date"
                        react={{
                            and: ['Search', 'Duration', 'Score', 'Genre', 'OriginalCountry', 'OriginalLanguage', 'ParentalGuide']
                        }}
                        style={{
                            marginBottom: 20
                        }}
                    />

                    <RangeInput
                        componentId="Duration"
                        dataField="duration"
                        title="Duración (minutos)"
                        snap={false}
                        style={{
                            marginBottom: 20
                        }}
                        rangeLabels={{
                            "start": "0",
                            "end": "240"
                        }}
                        range={{
                            "start": 0,
                            "end": 240
                        }}
                        react={{
                            and: ['Search', 'ReleaseDate', 'Score', 'Genre', 'OriginalCountry', 'OriginalLanguage', 'ParentalGuide']
                        }}
                    />

                    <RatingsFilter
                        componentId="Score"
                        dataField="score"
                        title="Valoración"
                        data={[
                            {"start": 4, "end": 5, "label": "Sobresaliente"},
                            {"start": 3, "end": 4, "label": "Notable"},
                            {"start": 2, "end": 3, "label": "Buena"},
                            {"start": 1, "end": 2, "label": "Mediocre"},
                            {"start": 0, "end": 1, "label": "Mala"}
                        ]}
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Genre', 'OriginalCountry', 'OriginalLanguage', 'ParentalGuide']
                        }}
                        style={{
                            marginBottom: 20
                        }}
                    />

                    <MultiList
                        componentId="Genre"
                        dataField="genre"
                        style={{
                            marginBottom: 20
                        }}
                        title="Género"
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Score', 'OriginalCountry', 'OriginalLanguage', 'ParentalGuide']
                        }}
                        showCheckbox={true}
                        showSearch={false}
                    />

                    <MultiList
                        componentId="OriginalCountry"
                        dataField="original_country"
                        style={{
                            marginBottom: 20
                        }}
                        title="País de origen"
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Score', 'Genre', 'OriginalLanguage', 'ParentalGuide']
                        }}
                        showCheckbox={true}
                        showSearch={false}
                    />

                    <MultiList
                        componentId="OriginalLanguage"
                        dataField="original_language"
                        style={{
                            marginBottom: 20
                        }}
                        title="Idioma original"
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Score', 'Genre', 'OriginalCountry', 'ParentalGuide']
                        }}
                        showCheckbox={true}
                        showSearch={false}
                    />

                    <MultiList
                        componentId="ParentalGuide"
                        dataField="parental_guide"
                        style={{
                            marginBottom: 20
                        }}
                        title="Guía parental"
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Score', 'Genre', 'OriginalCountry', 'OriginalLanguage']
                        }}
                        showCheckbox={true}
                        showSearch={false}
                    />

                </Card>
            </Col>
            <Col id={"searchbar_and_result"} span={14}>
                <DataSearch
                    componentId="Search"
                    dataField={['title', 'director', 'popular_cast']}
                    fieldWeights={[9, 1, 2]}
                    fuzziness={1}
                    highlightField={['title', 'director', 'popular_cast']}
                    placeholder="Buscar películas"
                    style={{
                        marginTop: 5,
                        marginLeft: 10,
                    }}
                    title="Films by IMDb"
                />

                <SelectedFilters
                    style={{
                        marginLeft: 10,
                        marginBottom: 20,
                    }}
                />

                <div id="result">
                    <ReactiveList
                        componentId="result"
                        dataField="_score"
                        pagination={true}
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Score', 'Genre', 'OriginalCountry', 'OriginalLanguage', 'ParentalGuide']
                        }}
                        renderItem={RenderFilm}
                        size={10}
                        style={{
                            marginTop: 20,
                            marginLeft: 15
                        }}
                        sortOptions={[
                            {
                                dataField: "_score",
                                sortBy: "desc",
                                label: "Ordenar por relevancia \u00A0",
                            },
                            {
                                dataField: "score",
                                sortBy: "desc",
                                label: "Ordenar por valoración (Mayor a menor) \u00A0",
                            },
                            {
                                dataField: "score",
                                sortBy: "asc",
                                label: "Ordenar por valoración (Menor a mayor) \u00A0",
                            },
                            {
                                dataField: "title_keyword",
                                sortBy: "asc",
                                label: "Ordenar por título \u00A0",
                            },
                            {
                                dataField: "release_date",
                                sortBy: "desc",
                                label: "Ordenar por fecha de lanzamiento (Más nuevas a más viejas) \u00A0",
                            },
                            {
                                dataField: "release_date",
                                sortBy: "asc",
                                label: "Ordenar por fecha de lanzamiento (Más viejas a más nuevas) \u00A0",
                            },
                            {
                                dataField: "duration",
                                sortBy: "desc",
                                label: "Ordenar por duración (Más largas a más cortas) \u00A0",
                            },
                            {
                                dataField: "duration",
                                sortBy: "asc",
                                label: "Ordenar por duración (Más cortas a más largas) \u00A0",
                            },
                        ]}
                    />
                </div>
            </Col>
        </Row>
    </ReactiveBase>
);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);