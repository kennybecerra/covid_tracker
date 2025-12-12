import { Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import GlobeMap from "./routes/Map/Map";

import "./dayjs";
import { CovidLayout } from "./components/Layout";

function App() {
	return (
		<Switch>
			<Route exact path={["/", "overview"]}>
				<CovidLayout />
			</Route>
			<Route exact path="/map">
				<GlobeMap />
			</Route>
			<Route path="*">
				<Redirect to="/" />
			</Route>
		</Switch>
	);
}

export default App;
