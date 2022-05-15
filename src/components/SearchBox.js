import React from "react";

const SearchBox = (props) => {
	return (
		<div className="search-box">
			<input 
				className="search-input"
				type="text"
				value={props.value} 
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder="Search movie" />
		</div>
	);
}

export default SearchBox;