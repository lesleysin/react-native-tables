import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ColumnOptions from '../../types/CellOptions';
import broadcaster from '../../utils/Broadcaster';
import DateTimeFormatter from '../../utils/DateTimeFormatter';

interface ICellProps {
    config: ColumnOptions;
    parentIndex: number;
    ownIndex: number;
    matrix: any[][];
}

const Cell: FC<ICellProps> = ({ config, parentIndex, ownIndex, matrix }) => {
    const [cellValue, setCellValue] = useState<any>();
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        setCellValue(matrix[parentIndex][ownIndex])
    }, [matrix])

    const onRowPressInListener = useCallback((val: boolean) => {
        setPressed(val)
    }, []);

    const onRowPressOutListener = useCallback((val: boolean) => {
        const vals = new Array();

        for (let index = 0; index < matrix.length; index++) {
            const element = matrix[index][ownIndex];
            vals.push(element)
        }

        console.log(vals)

        setPressed(val)
    }, []);

    const onRowPressInHandler = useCallback(() => {
        broadcaster.emit(`row:pressIn:${ownIndex}`, true)
        setPressed(true)
    }, []);

    const onRowPressOutHandler = useCallback(() => {
        broadcaster.emit(`row:pressOut:${ownIndex}`, false)
        setPressed(false)
    }, []);

    // useEffect(() => {
    //     broadcaster.addListener(`row:pressIn:${ownIndex}`, onRowPressInListener);
    //     broadcaster.addListener(`row:pressOut:${ownIndex}`, onRowPressOutListener);

    //     return () => {
    //         broadcaster.removeListener(`row:pressIn:${ownIndex}`, onRowPressInListener);
    //         broadcaster.removeListener(`row:pressOut:${ownIndex}`, onRowPressOutListener);
    //     }
    // }, [])

    const preparedValue = useMemo(() => {
        if (cellValue === null) return <View />

        switch (config.type) {
            case "string":
            case "number": {
                return (
                    <Text numberOfLines={1} >{cellValue}</Text>
                )
            }
            case "date": {
                const parsedDate = DateTimeFormatter.formatDate(cellValue, config.format, config.locale);
                if (parsedDate) {
                    return <Text numberOfLines={1} >{parsedDate.toString()}</Text>
                } else {
                    return <Text>Invalid date</Text>
                }
            }
            case "link": {
                return (
                    <Text>{cellValue}</Text>
                )
            }
        };
    }, [cellValue])

    return (
        <Pressable 
        style={[styles.cell, { backgroundColor: pressed ? "#DCDCDC" : undefined }]} 
        // onPressIn={onRowPressInHandler} 
        // onPressOut={onRowPressOutHandler} 
        >
            {preparedValue}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        minHeight: 40,
        width: "auto",
        borderWidth: 0.3,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        backgroundColor: "blue"
        // backgroundColor: "red"
    }
})

export default Cell;