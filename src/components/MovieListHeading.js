import React from "react";

const MovieListHeading = (props) => {
	return (
		<header className="header">
			<h1 className="header-name">{props.header}</h1>
		</header>
	);
}

export default MovieListHeading;