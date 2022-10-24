import type { GestureResponderEvent } from "react-native";
import type { ITableStaticProps } from "../utils/TableStatic";
import type ColumnOptions from "./CellOptions";
import type { SortDirection } from "./Sorting";
import type { TableData } from "./TableData";

 interface ITableProps extends ITableStaticProps {
    config: ColumnOptions[];
    data: TableData;
    estimatedRowCount?: number;
    enableHorizontalScroll?: boolean;
    onCellPress?: (event: GestureResponderEvent, cellValue: any) => void;
    onRowPress?: (event: GestureResponderEvent, rowValues: any[]) => void;
}

export interface TableRef {
    clearTable: () => void;
    sort: (index: number, direction: SortDirection) => void;
}

export default ITableProps;