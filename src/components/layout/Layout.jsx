import { Box } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

const Layout = ({ children }) => {
	return (
		<Box bg="#d9d9d9" color="#3b3b3b" minHeight="100vh" height="100vh">
			<Sidebar />
			<Box marginLeft="65px" height="100%">
				<Box height="8%">
					<Toolbar />
				</Box>
				<Box height="92%">{children}</Box>
			</Box>
		</Box>
	);
};

export default Layout;
