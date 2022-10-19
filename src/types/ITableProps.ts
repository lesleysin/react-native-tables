import type { GestureResponderEvent } from "react-native";
import type ColumnOptions from "./CellOptions";
import type { TableData } from "./TableData";

/**
 * @param config - array of column options
 * @param data - matrix for apply to current table view
 * @param estimatedRowCount - expected row count 
 * @param enableHorizontalScroll - enabling horizontal scroll for table view, false by default
 */
 interface ITableProps {
    config: ColumnOptions[];
    data: TableData;
    estimatedRowCount?: number;
    // useGlobalComponentOptions?: boolean;
    enableHorizontalScroll?: boolean;
    onCellPress?: (event: GestureResponderEvent, cellValue: any) => void;
    onRowPress?: (event: GestureResponderEvent, rowValues: any[]) => void;
}

export default ITableProps;