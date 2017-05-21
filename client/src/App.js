import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {movies: []}
  loadMore() {
    this.pageNumber++;
    axios.get('/movies', {params: {
      page: this.pageNumber 
    }})
    .then(movies => {
        //TODO: abstract filtering into a function
        movies.data.results = movies.data.results.filter((movie) => movie.poster_path)
        let newMovies = this.state.movies.concat(movies.data.results);
        return this.setState({movies: newMovies});
    })
  }

  showIndividualView() {console.log('getting here')}
 
  componentDidMount() {
    this.pageNumber = 1;
    axios.get('/movies', {params: {
      page: this.pageNumber
    }})
    .then(movies => {
        movies.data.results = movies.data.results.filter((movie) => movie.poster_path)
        return this.setState({movies: movies.data.results});
    })
  }
  render() {
    return (
      <div className="App">
        <h1>movies</h1>
        <button onClick={this.loadMore.bind(this)}>Load More </button>
        <div className="grid">
          {this.state.movies.map(movie =>
            <div key={movie.id} className="grid-item">
              <div>{movie.title}</div>
              <img onClick={this.showIndividualView.bind(this)} alt="movie" src={'http://image.tmdb.org/t/p/w185/' + movie.poster_path}></img>
            </div>
          )}
        </div>
      </div>
    );
  }
}


export default App;
