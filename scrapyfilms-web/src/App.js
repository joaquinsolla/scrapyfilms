import React, { Component } from 'react';
import './App.css';

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

    render() {
        return (
            <div className="app">
                <header>
                    <h1>Scrapyfilms</h1>
                </header>
                <main>
                    <div className="search-bar">
                        <h2>Top 250 by IMDb</h2>
                        <input
                            type="text"
                            placeholder="Buscar películas..."
                            value={this.state.searchQuery}
                            onChange={(e) => this.setState({ searchQuery: e.target.value })}
                        />
                        <button onClick={this.handleSearch}>Buscar</button>
                    </div>

                    <div className="filters">
                        <h2>Probando filtros</h2>

                    </div>


                    <div className="movie-list">
                        {/* Muestra los resultados de la búsqueda aquí */}
                    </div>

                </main>
                <footer>
                    <p><b>WEBAPP DEVELOPED TO RIWS</b><br/><br/>&copy;&nbsp;Joaquín Solla & David Zambrana 2023</p>
                </footer>
            </div>
        );
    }
}

export default App;
