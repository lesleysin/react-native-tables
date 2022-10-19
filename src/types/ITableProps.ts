import type { GestureResponderEvent } from "react-native";
import type { ITableStaticProps } from "../utils/TableStatic";
import type ColumnOptions from "./CellOptions";
import type { TableData } from "./TableData";

 interface ITableProps extends ITableStaticProps {
    config: ColumnOptions[];
    data: TableData;
    estimatedRowCount?: number;
    enableHorizontalScroll?: boolean;
    onCellPress?: (event: GestureResponderEvent, cellValue: any) => void;
    onRowPress?: (event: GestureResponderEvent, rowValues: any[]) => void;
}

export default ITableProps;