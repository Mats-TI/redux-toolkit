import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TopicApp from "./features/apps/topic";
import Navbar from "./components/layout/Toolbar";
import Layout from "./components/layout/Layout";
import styles from './index.css';
import AuthPage from "./components/layout/AuthPage";
import 'antd/dist/reset.css';

function App() {
	return (
		<>
			<Layout>
				<Routes>
					<Route path="/" element={<TopicApp />} />
					<Route path="/topics" element={<TopicApp />} />
					<Route path="/authentication" element={<AuthPage />} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
