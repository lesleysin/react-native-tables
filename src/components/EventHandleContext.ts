import React from "react";

import type { GestureResponderEvent } from "react-native";
import type { ITableStaticProps } from "../utils/TableStatic";


interface IEventHandleContext extends ITableStaticProps {
  onCellPress?: (event: GestureResponderEvent, cellValue: any) => void;
  onRowPress?: (event: GestureResponderEvent, rowValues: any[]) => void;
}

const EventHandleContext = React.createContext<IEventHandleContext>({});

export default EventHandleContext;
