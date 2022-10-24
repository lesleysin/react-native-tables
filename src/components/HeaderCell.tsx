import React, { FC, useCallback, useContext, useMemo, useRef } from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

import TableStatic from "../utils/TableStatic";
import TableViewContext from "./TableViewContext";
import { colorPalette } from "../constants/colorPallete";
import { borderRadius, borderWidth } from "../constants/border";

import type ColumnOptions from "../types/CellOptions";
import type { SortDirection } from "../types/Sorting";

export interface IHeaderCellProps {
  config: ColumnOptions;
  index: number;
  lastIndex: number;
}

const HeaderCell: FC<IHeaderCellProps> = ({ config, index, lastIndex }) => {
	const { headerCellContainerStyle, headerCellTextStyle, onSortEmited } =
    useContext(TableViewContext);
	const { isSortable, sortIcon } = config;
	const sortDir = useRef<SortDirection>("ASC");

	/**
   * Function for get style by heder position in array
   * @returns style object for current case
   */
	function getCellStyle(): ViewStyle {
		if (index === 0) {
			return {
				...styles.default,
				...styles.cellFirst,
				...headerCellContainerStyle?.firstCellStyle,
				...TableStatic.headerCellContainerStyle.firstCellStyle,
			};
		}

		if (index === lastIndex) {
			return {
				...styles.default,
				...styles.cellLast,
				...headerCellContainerStyle?.lastCellStyle,
				...TableStatic.headerCellContainerStyle.lastCellStyle,
			};
		}

		return {
			...styles.default,
			...headerCellContainerStyle?.defaultCellStyle,
			...TableStatic.headerCellContainerStyle.defaultCellStyle,
		};
	}

	const onCellPressed = useCallback(() => {
		if (isSortable) {
			onSortEmited?.(index, sortDir.current);
			sortDir.current = sortDir.current === "ASC" ? "DSC" : "ASC";
		}
	}, []);

	/**
   * Memoised header cell view
   */
	const headerView = useMemo(() => {
		return (
			<View>
				<Pressable onPress={onCellPressed} style={getCellStyle()}>
					<Text
						style={[styles.text, { ...headerCellTextStyle, ...TableStatic.headerCellTextStyle }]}
					>
						{config.title}
					</Text>
					{isSortable && sortIcon}
				</Pressable>
			</View>
		);
	}, [config]);

	return <View style={styles.fl}>{headerView}</View>;
};

const styles = StyleSheet.create({
	fl: {
		flex: 1,
	},
	cellFirst: {
		borderTopLeftRadius: borderRadius,
		borderRightWidth: borderWidth,
		borderColor: colorPalette.borderAccent,
	},
	cellLast: {
		borderTopRightRadius: borderRadius,
		borderLeftWidth: borderWidth,
		borderColor: colorPalette.borderAccent,
	},
	default: {
		flex: 1,
		width: "auto",
		minHeight: 40,
		backgroundColor: colorPalette.primary,
		borderRightWidth: borderWidth,
		borderRightColor: colorPalette.borderAccent,
		justifyContent: "space-evenly",
		alignItems: "center",
		padding: 8,
		flexDirection: "row",
	},
	text: {
		color: colorPalette.textHeading,
		fontSize: 16,
		lineHeight: 18,
		fontWeight: "400",
	},
});

export default HeaderCell;
