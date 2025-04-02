import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./app/layout";
import Home from "../src/app/Home/Home";
import SideBarOutLet from "./app/SideBarOutlet/SideBarOutlet";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<SideBarOutLet />}>
						<Route index element={<Home />} />
						<Route path="account" element={<Layout />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
