import React from "react";

const MovieList = (props) => {
	return (
		<div className="movie-list">
			{props.movies.map((movie,index) => ( 
				<div className="movie-item" key={index}>
					<img src={movie.Poster} alt="movie" className="movie-img" />
					<div className="overlay" onClick={() => props.hanldeClickFavourite(movie)}>
						<props.favouriteComponent title={props.title}/>
					</div>
					
				</div>
			))}		
		</div>
	);
}

export default MovieList;