import { Box, Flex, Tooltip } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
	const linkStyle = {
		padding: "0.2rem",
		color: "white",
	};

	const activeStyle = {
		background: "#006699",
		borderRadius: "5px",
		padding: "0.2rem",
		color: "white",
	};

	return (
		<Box
			pos="fixed"
			top={0}
			left={0}
			h="100%"
			w="65px"
			zIndex={100}
			color="white"
			overflow="hidden"
			p="1rem"
			bg="#002e45"
		>
			<Flex flexDirection="column" gap="1rem" marginTop="4rem">
				<Tooltip
					ml={16}
					label="Home"
					placement="right"
					bg="#002e45"
					p={4}
					color="#fff"
					hasArrow
				>
					<NavLink
						to="/home"
						style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
							/>
						</svg>
					</NavLink>
				</Tooltip>
				<Tooltip
					ml={16}
					label="Topics"
					placement="right"
					bg="#002e45"
					p={4}
					color="#fff"
					hasArrow
				>
					<NavLink
						to="/topics"
						style={({ isActive }) => (isActive ? activeStyle : linkStyle)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>
					</NavLink>
				</Tooltip>
			</Flex>
		</Box>
	);
};

export default Sidebar;
