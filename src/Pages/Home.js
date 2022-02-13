import React, {useState} from "react";
import {useLazyQuery} from '@apollo/client';
import { GET_WEATHER_QUERY } from '../graphql/queries';

function Home () {

	const [citySearched, setCitySearched] = useState('');
	const [getWeather, {loading, data, error}] = useLazyQuery(
	GET_WEATHER_QUERY, {
		variables: { name: citySearched },
	});

	if (error) return <h1>Error found</h1>
	if (data) {
		console.log(data);
	}

	return (
		<div className="home">
		<h1>Search for Weather</h1>
		<input
			type="text"
			placeholder="City name..."
			onChange={(event) => {
				setCitySearched(event.target.value);
			}}/>
		<button onClick={() => getWeather()}>Search</button>
		<p>Note: All data is pulled from GraphQL API</p>
		<div className="weather">
			{ data && (
			<>
				<p>
					<strong>City:</strong> {data.getCityByName.name}<br />
					<strong>Country:</strong> {data.getCityByName.country}<br />
					<strong>Temperature:</strong> {data.getCityByName.weather.temperature.actual}<br />
					<strong>Description:</strong> {data.getCityByName.weather.summary.description}<br />
					<strong>Wind:</strong> {data.getCityByName.weather.wind.speed}<br />
				</p>
			</>
			)}

		</div>
		</div>
);
}

export default Home;
