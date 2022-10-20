import React, {
	forwardRef,
	ForwardRefRenderFunction,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { ScrollView, View } from "react-native";

import { ColumnConfiguration } from "../../types/CellOptions";
import Column from "../Column";
import TableViewContext from "../TableViewContext";
import { TableStatic } from "../../utils";

import type { TableData } from "../../types/TableData";
import type ColumnOptions from "../../types/CellOptions";
import type ITableProps from "../../types/ITableProps";
import type { TableRef } from "../../types/ITableProps";

const Table: ForwardRefRenderFunction<TableRef, ITableProps> = (
	{
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
	},
	ref
) => {
	const [matrix, setMatrix] = useState<any[][]>([]);

	useImperativeHandle(ref, () => ({
		clearTable,
	}));

	useEffect(() => {
		const size = getEstimatedSize();
		const newMatrix = createMatrix(config.length, size);
		const updatedMatrix = updateMatrix(newMatrix, data);
		setMatrix(updatedMatrix);
	}, [data]);

	function clearTable() {
		const newMatrix = [...matrix];
		for (let xIndex = 0; xIndex < newMatrix.length; xIndex++) {
			const yElement = data[xIndex];

			if (yElement === null || yElement === undefined) continue;

			for (let yIndex = 0; yIndex < yElement.length; yIndex++) {
				newMatrix[xIndex][yIndex] = null;
			}
		}
		setMatrix(newMatrix);
	}

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
   *
   * @param data - matrix with table data
   */
	function updateMatrix(target: any[][], data: TableData) {
		const editableData = [...target];
		for (let xIndex = 0; xIndex < data.length; xIndex++) {
			const yElement = data[xIndex];

			if (yElement === null || yElement === undefined) {
				continue;
			}

			for (let yIndex = 0; yIndex < yElement.length; yIndex++) {
				const value = yElement[yIndex];
				editableData[xIndex][yIndex] = value ?? null;
			}
		}
		return editableData;
	}

	/**
   * try get row count from context
   * @returns rows number or 0
   */
	function getEstimatedSize() {
		if (data && data.length > 0) {
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
				<Column key={`col:${itemId}`} config={configItem} index={index} lastIndex={lastIndex} />
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
			<TableViewContext.Provider
				value={{
					matrix,
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
			</TableViewContext.Provider>
		</View>
	);
};

export default forwardRef(Table);
