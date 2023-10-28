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
    RatingsFilter,
    MultiList
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

// FUTURE USAGE
function renderFilm(res, triggerClickAnalytics) {
    let {title} = {
        "title": "title", "showRest": false
    };
    title = getNestedValue(res, title)

    return (
        <Row onClick={triggerClickAnalytics} type="flex" gutter={16} key={res._id}
             style={{margin: '20px auto', borderBottom: '1px solid #ededed'}}>

            <Col span={14}>
                <p style={{fontSize: '1em'}}
                   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(title)}}/>
            </Col>
        </Row>
    );
}

const App = () => (
    <ReactiveBase
        app="scrapyfilms_index"
        url="http://localhost:9200"
        analytics={false}
        searchStateHeader
    >
        <Row style={{padding: 20}}>
            <Col span={5}>
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
                        showFilter={false}
                        filterLabel="Date"
                        URLParams={false}
                        react={{
                            and: ['Search', 'Duration', 'Score', 'OriginalCountry', 'OriginalLanguage', 'ParentalGuide']
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
                            and: ['Search', 'ReleaseDate', 'Score', 'OriginalCountry', 'OriginalLanguage', 'ParentalGuide']
                        }}
                    />

                    <RatingsFilter
                        componentId="Score"
                        dataField="score"
                        title="Valoración"
                        data={[
                            { start: 5, end: 5, label: 'Sobresaliente' },
                            { start: 4, end: 5, label: 'Notable' },
                            { start: 3, end: 5, label: 'Buena' },
                            { start: 2, end: 5, label: 'Mediocre' },
                            { start: 1, end: 5, label: 'Mala' },
                        ]}
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'OriginalCountry', 'OriginalLanguage', 'ParentalGuide']
                        }}
                        style={{
                            marginBottom: 20
                        }}
                    />

                    <MultiList
                        componentId="OriginalCountry"
                        dataField="original_country.raw"
                        style={{
                            marginBottom: 20
                        }}
                        title="País de origen"
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Score', 'OriginalLanguage', 'ParentalGuide']
                        }}
                    />

                    <MultiList
                        componentId="OriginalLanguage"
                        dataField="original_language.raw"
                        style={{
                            marginBottom: 20
                        }}
                        title="Idioma original"
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Score', 'OriginalCountry', 'ParentalGuide']
                        }}
                    />

                    <MultiList
                        componentId="ParentalGuide"
                        dataField="parental_guide.raw"
                        style={{
                            marginBottom: 20
                        }}
                        title="Guía parental"
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Score', 'OriginalCountry', 'OriginalLanguage']
                        }}
                    />

                </Card>
            </Col>
            <Col span={10}>
                <DataSearch
                    componentId="Search"
                    dataField={['title']}
                    fieldWeights={[5]}
                    fuzziness={1}
                    highlightField={['title']}
                    placeholder="Buscar películas"
                    style={{
                        marginTop: 5,
                        marginBottom: 20,
                        marginLeft: 10,
                    }}
                    title="IMDb Top 250"
                />

                <SelectedFilters/>

                <div id="result">
                    <ReactiveList
                        componentId="result"
                        dataField="_score"
                        pagination={true}
                        loader="Cargando..."
                        react={{
                            and: ['Search', 'ReleaseDate', 'Duration', 'Score', 'OriginalCountry', 'OriginalLanguage', 'ParentalGuide']
                        }}
                        renderItem={(res) => <div>{res.title}</div>}
                        size={10}
                        style={{
                            marginTop: 20,
                            marginLeft: 15
                        }}
                        sortOptions={[
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
                                dataField: "title",
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