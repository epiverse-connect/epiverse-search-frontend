import Grid from './Grid';
import MapCol from './MapCol';
import SearchCol from './SearchCol';

function App() {
	return (
		<div className="md:flex flex-col min-h-screen">
			<header className="grow-0 items-center text-center">
				<h1>Find your next epidemiology tools</h1>
			</header>
			<Grid first={<SearchCol />} second={<MapCol />} />
		</div>
	);
}

export default App;
