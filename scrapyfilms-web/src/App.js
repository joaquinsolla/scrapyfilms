import React, { Component } from 'react';
import './App.css';

import banner from './assets/banner.png';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const orderOptions = [
    'Ordenar por orden alfabético',
    'Ordenar por fecha ascendente',
    'Ordenar por fecha descendente',
];
const defaultOrderOption = orderOptions[0];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            movies: [],
        };
    }

    handleSearch = () => {
        // Aquí puedes implementar la lógica para buscar películas
        // y actualizar el estado 'movies' con los resultados.
    };

    clearFilters = () => {


    };

    render() {
        return (
            <div className="app">
                <header>
                    <img src={banner} alt="Web banner" className="banner"></img>
                </header>
                <main>
                    <div className="filters">
                        <h2>Filtrar</h2>

                    </div>

                    <div className="searchAndResults">
                        <div className="search-bar">
                            <h1>Top 250 by IMDb</h1>
                            <div className="flexItem">
                                <div className="pc80">
                                    <input
                                        type="text"
                                        placeholder="Buscar películas..."
                                        value={this.state.searchQuery}
                                        onChange={(e) => this.setState({ searchQuery: e.target.value })}
                                    />
                                    <button className="mainButton" onClick={this.handleSearch}>&#x1F50E;&#xFE0E;</button>
                                </div>
                                <div className="pc20 right">
                                    <Dropdown options={orderOptions} onChange={this._onSelect} value={defaultOrderOption} placeholder="Ordernar" />
                                </div>
                            </div>
                        </div>
                        <div className="activeFilters">
                            <button className="clearFiltersButton" onClick={this.clearFilters}>Borrar todos los filtros</button>
                            <label>&nbsp;&nbsp;|&nbsp;&nbsp;</label>

                            {/* TODO: LISTA DE FILTROS ACTIVOS */}

                        </div>
                        <div className="movie-list">
                            {/* Muestra los resultados de la búsqueda aquí */}
                            <p>Films belong here!!!</p>
                        </div>
                    </div>

                </main>
                <footer>
                    <p><b>WEBAPP DEVELOPED FOR RIWS</b><br/><br/>&copy;&nbsp;Joaquín Solla & David Zambrana 2023</p>
                </footer>
            </div>
        );
    }
}

export default App;
