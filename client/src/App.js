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
  // TODO: refactor into List + List-Item views.
  showIndividualView = (e, movie) => {
    this.individualView = true;
    axios.get('/movies/' + movie.id, {params: {
      id: movie.id
    }})
    .then(movie => {
        console.log(movie, 'the movie returned from showIndividualView')
        return this.setState({movies: [movie.data]});
    })
  }

  backToSummaryView = () => {
    this.pageNumber = 1;
    this.individualView = false;
    axios.get('/movies', {params: {
      page: this.pageNumber
    }})
    .then(movies => {
        movies.data.results = movies.data.results.filter((movie) => movie.poster_path)
        return this.setState({movies: movies.data.results});
    })
  }
 
  componentDidMount() {
    this.backToSummaryView()
  }
  render() {
    return (
      <div className="App">
        <h1>movies</h1>
        <button onClick={this.loadMore.bind(this)}>Load More </button>
        <button onClick={this.backToSummaryView.bind(this)}> Back To Summary</button>
        <div className="grid">
          {this.state.movies.map(movie =>
            <div key={movie.id} className="grid-item">
              <div>{movie.title}</div>
              {this.individualView &&
                <div>
                <div><b>overview: </b>{movie.overview}</div>
              <div><b>tagline:</b>{movie.tagline}</div>
              <div><b>status: </b>{movie.status}</div>
              </div>
            }
              {!movie.notFound && <img onClick={(e) => this.showIndividualView(e, movie)} alt="movie" src={'http://image.tmdb.org/t/p/w185/' + movie.poster_path}></img>}
            </div>
          )}
        </div>
      </div>
    );
  }
}


export default App;
