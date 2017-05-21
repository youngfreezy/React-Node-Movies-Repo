import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';

class App extends Component {
  state = {movies: [], modalIsOpen: false, selectedMovie: []}
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

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  showIndividualView = (e, movie) => {
    axios.get('/movies/' + movie.id, {params: {
      id: movie.id
    }})
    .then(movie => {
        this.setState({selectedMovie: movie.data});
        return this.openModal();
    })
  }

 
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
        
        <button onClick={this.loadMore.bind(this)}>Load More </button>
        
        <div className="grid">
          {this.state.movies.map(movie =>
            <div key={movie.id} className="grid-item">
              <div>{movie.title}</div>      
              {<img onClick={(e) => this.showIndividualView(e, movie)} alt="movie" src={'http://image.tmdb.org/t/p/w185/' + movie.poster_path}></img>}
            </div>
          )}
        </div>

         <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          contentLabel="Example Modal"
          > 
          <button onClick={this.closeModal.bind(this)}>close</button>
            <div className="Aligner">
              <div className="Aligner-item">
                <img alt="movie" src={'http://image.tmdb.org/t/p/w342/' + this.state.selectedMovie.poster_path}></img>
                <div><b>overview: </b>{this.state.selectedMovie.overview}</div>
                <div><b>tagline:</b>{this.state.selectedMovie.tagline}</div>
                <div><b>status:</b>{this.state.selectedMovie.status}</div>
              </div>
            </div>
          </Modal>
      </div>
    );
  }
}


export default App;
