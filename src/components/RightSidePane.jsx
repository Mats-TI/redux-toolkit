import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";

const RightSidePane = ({
	showRightSidebar,
	setShowLeftSidebar,
	setShowRightSidebar,
	children,
}) => {
	return (
		<Box w="100%">
			<Box
				pos="absolute"
				top="30%"
				right="96%"
				w={showRightSidebar ? 35 : 70}
				height={35}
				p={showRightSidebar ? 2 : 0}
				display="flex"
				alignItems="center"
				bg="#fff"
				border="1px solid #808080"
				cursor="pointer"
				borderRadius={showRightSidebar ? "50%" : "50px"}
				onClick={() => {
					setShowRightSidebar(!showRightSidebar);
					// setShowLeftSidebar(false);
				}}
			>
				{showRightSidebar ? (
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
							d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "50%", height: "70%", marginRight: 24 }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
						/>
					</svg>
				)}
			</Box>
			<Box>{children}</Box>
		</Box>
	);
};

export default RightSidePane;
