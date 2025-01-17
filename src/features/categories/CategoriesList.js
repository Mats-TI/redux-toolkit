import React, { useState, useEffect, useCallback } from "react";
import { useCategoriesQuery } from "./categoryApi";
import { Select, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Flex } from "@chakra-ui/react";

const CategoriesList = ({
	currentCategory,
	categoryChangeHandler,
	selection,
}) => {
	const { data = [], error, isLoading, isSuccess } = useCategoriesQuery();
	const categoriesFinal = [
		{ id: "0", title: "All categories" },
		...new Set(data.data),
	];

	let content = categoriesFinal.map(({ id, title }) => ({
		value: id,
		label: title,
	}));

	return (
		<>
			<div className="isErrorIsLoading">
				{error && <p>An error occured</p>}
				{isLoading && <p>Loading...</p>}
			</div>
			{isSuccess && (
				<Flex justifyContent="space-between" style={{ padding: 20 }}>
					<Select
						defaultValue="0"
						style={{
							width: 120,
						}}
						onChange={categoryChangeHandler}
						// allowClear
						options={content}
					/>
					<Tooltip title="Create new category">
						<Button className="mr-2 text-muted" icon={<PlusOutlined />}>
							Create category
						</Button>
					</Tooltip>
				</Flex>
			)}
		</>
	);
};

export default CategoriesList;
