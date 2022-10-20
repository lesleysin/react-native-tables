import React from "react";

import type { GestureResponderEvent } from "react-native";
import type { ITableStaticProps } from "../utils/TableStatic";


interface ITableViewContext extends ITableStaticProps {
  matrix: any[][];
  onCellPress?: (event: GestureResponderEvent, cellValue: any) => void;
  onRowPress?: (event: GestureResponderEvent, rowValues: any[]) => void;
}

const TableViewContext = React.createContext<ITableViewContext>({matrix: []});

export default TableViewContext;
