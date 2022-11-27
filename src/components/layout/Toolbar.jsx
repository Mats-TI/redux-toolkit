import { Heading, Flex, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Toolbar = () => {
	const navColor = useColorModeValue("#fff", "#2B3743");
	return (
		<Flex
			as="nav"
			bg="#fff"
			w="full"
			justify="space-between"
			align="center"
			p="15px 20px"
			height="100%"
			boxShadow="sm"
		>
			<Link to="/">
				<Heading as="h1" fontSize="24px" fontWeight="700" color="gray.500">
					Contentify
				</Heading>
			</Link>
		</Flex>
	);
};

export default Toolbar;
