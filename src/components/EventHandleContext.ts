import React from "react";

import type { GestureResponderEvent } from "react-native";

interface IEventHandleContext {
  onCellPress?: (event: GestureResponderEvent, cellValue: any) => void;
  onRowPress?: (event: GestureResponderEvent, rowValues: any[]) => void;
}

const EventHandleContext = React.createContext<IEventHandleContext>({});

export default EventHandleContext;
