import React, { FC, useCallback, useMemo } from "react";
import { View } from "react-native";

import Cell from "./Cell";
import HeaderCell from "./HeaderCell";

import type ColumnOptions from "../types/CellOptions";

interface IColumnProps {
  matrix: any[][];
  index: number;
  lastIndex: number;
  config: ColumnOptions;
}

const Column: FC<IColumnProps> = ({ matrix, index, lastIndex, config }) => {
	//FIXME - handle pan gesture events for change column width

	//NOTE - incorrect work with horizontal scroll

	// const [viewWidth, setViewWidth] = useState(0);

	// const onPanResponderReleaseHandler = useCallback((_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
	//     _.preventDefault()
	//     if (gestureState.dx > 0) {
	//         const current = gestureState.dx + viewWidth;
	//         setViewWidth(current);
	//     } else {
	//         const current = viewWidth - gestureState.dx;
	//         setViewWidth(current);
	//     }
	// }, [viewWidth]);

	// const panResponder = useRef(
	//     PanResponder.create({
	//         onStartShouldSetPanResponder: (evt, gestureState) => true,
	//         onStartShouldSetPanResponderCapture: (evt, gestureState) =>
	//             true,
	//         onMoveShouldSetPanResponder: (evt, gestureState) => true,
	//         onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
	//             true,
	//         onPanResponderTerminationRequest: (evt, gestureState) =>
	//             true,
	//         onPanResponderRelease: onPanResponderReleaseHandler,
	//         onShouldBlockNativeResponder: (evt, gestureState) => {
	//             // Returns whether this component should block native components from becoming the JS
	//             // responder. Returns true by default. Is currently only supported on android.
	//             return true;
	//         }
	//     })
	// );

	// const onLayoutHandler = useCallback((e: LayoutChangeEvent) => {
	//     const w = e.nativeEvent.layout.width;
	//     setViewWidth(w)
	// }, [])

	const columnHeader = useMemo(() => {
		return (
			<HeaderCell
				key={`headercell:${config.id}`}
				config={config}
				index={index}
				lastIndex={lastIndex}
				matrix={matrix}
			/>
		);
	}, [config, index, lastIndex]);

	const renderCell = useCallback(
		(_: any, own: number) => {
			return (
				<Cell
					matrix={matrix}
					key={`cell${index}${own}${config.id}`}
					config={config}
					parentIndex={index}
					ownIndex={own}
				/>
			);
		},
		[index, matrix]
	);

	const columnDataCells = useMemo(() => {
		if (matrix && matrix.length > 0) {
			return matrix[index].map(renderCell);
		}
		return <View />;
	}, [matrix]);

	return (
		<View style={{ flex: 1 }}>
			{columnHeader}
			{columnDataCells}
		</View>
	);
};

export default Column;
