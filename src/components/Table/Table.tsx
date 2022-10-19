import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import { ColumnConfiguration } from "../../types/CellOptions";
import Column from "../Column";
import EventHandleContext from "../EventHandleContext";
import broadcaster from "../../utils/Broadcaster";
import { TableStatic } from "../../utils";

import type { TableData } from "../../types/TableData";
import type ColumnOptions from "../../types/CellOptions";
import type { CompareEntryPoint } from "../../types/CompareEntry";
import type ITableProps from "../../types/ITableProps";

const Table: FC<ITableProps> = ({
	config,
	data,
	estimatedRowCount,
	onCellPress,
	onRowPress,
	numericCellTextStyle,
	stringCellTextStyle,
	linkCellTextStyle,
	dateCellTextStyle,
	headerCellTextStyle,
	cellContainerStyle,
	headerCellContainerStyle,
	columnContainerStyle,
	horizontalScrollViewProps,
	verticalScrollViewProps,
	enableHorizontalScroll = false,
}) => {
	const [matrix, setMatrix] = useState<any[][]>([]);

	useLayoutEffect(() => {
		const size = getEstimatedSize();
		const newMatrix = createMatrix(config.length, size);
		setMatrix(newMatrix);
	}, []);

	useEffect(() => {
		if (data && data.length > 0) {
			const compareResult = compareMatrix(matrix, data);
			updateMatrix(data);
			compareResult.forEach(({ xIndex, yIndex }) => {
				broadcaster.emit(`cell:update:force${xIndex}${yIndex}`);
			});
		}
	}, [data]);

	/**
   *
   * @param mainLenght - count of columns (from configuration)
   * @param rowCount - computed value of row based on data array lenght (if defined) or estimated rows count
   * @returns new matrix
   */
	function createMatrix(mainLenght: number, rowCount: number) {
		const arr: any[] = [];
		for (let i = 0; i < mainLenght; i++) {
			arr[i] = [];
			for (let j = 0; j < rowCount; j++) {
				arr[i][j] = null;
			}
		}
		return arr;
	}

	/**
   * @param current - current table data
   * @param other - new table data
   * @returns array of compare results as object with coordinates of changed prop in current matrix;
   */
	function compareMatrix(current: TableData, other: TableData) {
		const needUpdateList: CompareEntryPoint[] = [];
		for (let xIndex = 0; xIndex < current.length; xIndex++) {
			const itemA = current[xIndex];
			const itemB = other[xIndex];

			if (itemA && itemB) {
				for (let yIndex = 0; yIndex < itemA.length; yIndex++) {
					const itemAa = itemA[yIndex];
					const itemBb = itemB[yIndex];

					if (itemAa === itemBb || itemB === null) {
						continue;
					} else {
						needUpdateList.push({
							xIndex,
							yIndex,
						});
					}
				}
			}
		}
		return needUpdateList;
	}

	/**
   *
   * @param data - matrix with table data
   */
	function updateMatrix(data: TableData) {
		const editableData = [...matrix];
		for (let xIndex = 0; xIndex < editableData.length; xIndex++) {
			const yElement = data[xIndex];

			if (yElement === null || yElement === undefined) continue;

			for (let yIndex = 0; yIndex < yElement.length; yIndex++) {
				const value = yElement[yIndex];
				editableData[xIndex][yIndex] = value;
			}
		}
		setMatrix(editableData);
	}

	/**
   * try get row count from context
   * @returns rows number or 0
   */
	function getEstimatedSize() {
		if (data.length > 0) {
			return data.length;
		}

		if (estimatedRowCount) {
			return estimatedRowCount;
		}

		return 0;
	}

	/**
   * Render function for create columnt view
   */
	const renderHeaderCell = useCallback(
		(configItem: ColumnOptions, index: number) => {
			const lastIndex = config.length - 1;
			const itemId = configItem.id ? configItem.id : ColumnConfiguration.generateUId();
			configItem.id = itemId;
			return (
				<Column
					matrix={matrix}
					key={`col:${itemId}`}
					config={configItem}
					index={index}
					lastIndex={lastIndex}
				/>
			);
		},
		[matrix]
	);

	/**
   * Memoised configuration mapping result
   */
	const tableColumns = useMemo(() => {
		return config.map(renderHeaderCell);
	}, [config, matrix]);

	/**
   * Memoised wrapper for all columns
   */
	const tableView = useMemo(() => {
		if (data.length > 0 && enableHorizontalScroll) {
			return (
				<ScrollView {...verticalScrollViewProps} {...TableStatic.verticalScrollViewProps}>
					<ScrollView
						{...horizontalScrollViewProps}
						{...TableStatic.horizontalScrollViewProps}
						horizontal
					>
						{tableColumns}
					</ScrollView>
				</ScrollView>
			);
		}

		return (
			<ScrollView
				contentContainerStyle={{ flexDirection: "row", backgroundColor: "white" }}
				{...verticalScrollViewProps}
				{...TableStatic.verticalScrollViewProps}
			>
				{tableColumns}
			</ScrollView>
		);
	}, [data, enableHorizontalScroll, matrix]);

	return (
		<View>
			<EventHandleContext.Provider
				value={{
					onCellPress,
					onRowPress,
					numericCellTextStyle,
					stringCellTextStyle,
					linkCellTextStyle,
					dateCellTextStyle,
					headerCellTextStyle,
					cellContainerStyle,
					headerCellContainerStyle,
					columnContainerStyle,
					horizontalScrollViewProps,
					verticalScrollViewProps,
				}}
			>
				{tableView}
			</EventHandleContext.Provider>
		</View>
	);
};

export default Table;
