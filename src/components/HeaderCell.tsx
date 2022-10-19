import React, { FC, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

import TableStatic from "../utils/TableStatic";

import type ColumnOptions from "../types/CellOptions";


export interface IHeaderCellProps {
    config: ColumnOptions;
    index: number;
    lastIndex: number;
    matrix: any[][]
}

const HeaderCell: FC<IHeaderCellProps> = ({ config, index, lastIndex }) => {

	/**
     * Function for get style by heder position in array
     * @returns style object for current case
     */
	function getCellStyle(): ViewStyle {
		if (index === 0) {
			return { ...styles.default, ...styles.cellFirst, ...TableStatic.headerCellContainerStyle.firstCellStyle };
		}

		if (index === lastIndex) {
			return { ...styles.default, ...styles.cellLast, ...TableStatic.headerCellContainerStyle.lastCellStyle };
		}

		return { ...styles.default, ...TableStatic.headerCellContainerStyle.defaultCellStyle };
	}

	/**
     * Memoised header cell view
     */
	const headerView = useMemo(() => {
		return (
			<View>
				<Pressable style={getCellStyle()}>
					<Text style={[styles.text, TableStatic.headerCellTextStyle]}>{config.title}</Text>
				</Pressable>
			</View>
		);
	}, [config]);

	return (
		<View style={styles.fl} >
			{headerView}
		</View>
	);
};

const styles = StyleSheet.create({
	fl: {
		flex: 1
	},
	cellFirst: {
		borderTopLeftRadius: 8,
		borderRightWidth: 1,
		borderRightColor: "#DCDCDC",

	},
	cellLast: {
		borderTopRightRadius: 8,
		borderTopWidth: 1,
	},
	default: {
		flex: 1,
		width: "auto",
		minHeight: 40,
		backgroundColor: "blue",
		borderRightWidth: 1,
		borderRightColor: "#DCDCDC",
		justifyContent: "center",
		alignItems: "center",
		padding: 8
	},
	text: {
		color: "white"
	}
});

export default HeaderCell;