import React from "react";

const Filter = (props) => {
	return (
		<div className="select-container">
			<select 
				name="" id="select" 
				value={props.filters}
				onChange={(event) => {
					event.preventDefault();
					props.setFilters(event.target.value)}}>
				<option value="all">All</option>
				<option value="favourite">Favourite</option>
			</select>
		</div>
	);
}

export default Filter;