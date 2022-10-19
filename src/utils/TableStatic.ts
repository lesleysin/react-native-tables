import type { ScrollViewProps, TextStyle, ViewStyle } from "react-native";
import type { AvailableLocales, DateTimeFormat } from "../types/DateTimeFormat";

export interface CellViewProps {
  cellHighligntBackgroundColor?: string;
  longPressDelay?: number;
}

interface HeaderCellProps {
  firstCellStyle?: ViewStyle;
  lastCellStyle?: ViewStyle;
  defaultCellStyle?: ViewStyle;
}

class TableStatic {
	//text
	// static textStyle: TextStyle = {};
	static numericCellTextStyle: TextStyle = {};
	static stringCellTextStyle: TextStyle = {};
	static linkCellTextStyle: TextStyle = {};
	static dateCellTextStyle: TextStyle = {};
	static headerCellTextStyle: TextStyle = {};

	//containers
	static cellContainerStyle: ViewStyle & CellViewProps = {};
	static headerCellContainerStyle: HeaderCellProps = {};
	static columnContainerStyle: ViewStyle = {};
	static verticalScrollViewContentContainerStyle: ViewStyle = {};
	static horizontalScrollViewContentContainerStyle: ViewStyle = {};

	//scrollview handlers and behavior
	static horizontalScrollViewProps: ScrollViewProps = {};
	static verticalScrollViewProps: ScrollViewProps = {};
	static enableHorizontalScroll: boolean;

	//date time formatting
	static format?: DateTimeFormat;
	static locale?: AvailableLocales;
	static customFormattingPattern?: string;

	static clear() {
		TableStatic.numericCellTextStyle = {};
		TableStatic.stringCellTextStyle = {};
		TableStatic.linkCellTextStyle = {};
		TableStatic.dateCellTextStyle = {};
		TableStatic.headerCellTextStyle = {};
		TableStatic.cellContainerStyle = {};
		TableStatic.columnContainerStyle = {};
		TableStatic.verticalScrollViewContentContainerStyle = {};
		TableStatic.horizontalScrollViewContentContainerStyle = {};
		TableStatic.horizontalScrollViewProps = {};
		TableStatic.verticalScrollViewProps = {};
		TableStatic.enableHorizontalScroll = false;
		TableStatic.format = undefined;
		TableStatic.locale = undefined;
		TableStatic.customFormattingPattern = undefined;
	}
}

export default TableStatic;
