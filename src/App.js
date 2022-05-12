import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Photos from './components/Photos';


function App() {

	return (		
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/login" element={<Login />}/>
				<Route path="/register" element={<Register />}/>			
				<Route path="/photos" element={<Photos />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
