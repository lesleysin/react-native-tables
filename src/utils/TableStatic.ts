import type { ScrollViewProps, TextStyle, ViewStyle } from "react-native";
import type { AvailableLocales, DateTimeFormat } from "../types/DateTimeFormat";

export interface CellViewProps {
  cellHighligntBackgroundColor?: string;
  longPressDelay?: number;
}

export interface HeaderCellProps {
  firstCellStyle?: ViewStyle;
  lastCellStyle?: ViewStyle;
  defaultCellStyle?: ViewStyle;
}

export interface ITableStaticProps {
    numericCellTextStyle?: TextStyle;
    stringCellTextStyle?: TextStyle;
    linkCellTextStyle?: TextStyle;
    dateCellTextStyle?: TextStyle;
    headerCellTextStyle?: TextStyle;
    cellContainerStyle?: ViewStyle & CellViewProps;
    headerCellContainerStyle?: HeaderCellProps;
    columnContainerStyle?: ViewStyle;
    horizontalScrollViewProps?: ScrollViewProps;
    verticalScrollViewProps?: ScrollViewProps;
}

class TableStatic implements ITableStaticProps {
	//text
	static numericCellTextStyle: TextStyle = {};
	static stringCellTextStyle: TextStyle = {};
	static linkCellTextStyle: TextStyle = {};
	static dateCellTextStyle: TextStyle = {};
	static headerCellTextStyle: TextStyle = {};

	//containers
	static cellContainerStyle: ViewStyle & CellViewProps = {};
	static headerCellContainerStyle: HeaderCellProps = {};
	static columnContainerStyle: ViewStyle = {};

	//scrollview handlers and behavior
	static horizontalScrollViewProps: ScrollViewProps = {};
	static verticalScrollViewProps: ScrollViewProps = {};
	static enableHorizontalScroll: boolean;

	//date time formatting
	static format?: DateTimeFormat;
	static locale?: AvailableLocales;
	static customFormattingPattern?: string;

	/**
	 * @internal
	 */
	static clear() {
		TableStatic.numericCellTextStyle = {};
		TableStatic.stringCellTextStyle = {};
		TableStatic.linkCellTextStyle = {};
		TableStatic.dateCellTextStyle = {};
		TableStatic.headerCellTextStyle = {};
		TableStatic.cellContainerStyle = {};
		TableStatic.columnContainerStyle = {};
		TableStatic.horizontalScrollViewProps = {};
		TableStatic.verticalScrollViewProps = {};
		TableStatic.enableHorizontalScroll = false;
		TableStatic.format = undefined;
		TableStatic.locale = undefined;
		TableStatic.customFormattingPattern = undefined;
	}

	static create(args: ITableStaticProps) {
		for (const key in args) {
			if (Object.prototype.hasOwnProperty.call(args, key)) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				TableStatic[key] = args[key as keyof typeof args];
			}
		}
	}
}

export default TableStatic;
