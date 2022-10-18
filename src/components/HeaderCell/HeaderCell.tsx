import React, { FC, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Cell from '../Cell/Cell';
import TableStatic from '../../utils/TableStatic';
import ColumnOptions from '../../types/CellOptions';


export interface IHeaderCellProps {
    config: ColumnOptions;
    index: number;
    lastIndex: number;
    matrix: any[][]
}

const HeaderCell: FC<IHeaderCellProps> = ({ config, index, lastIndex, matrix }) => {

    function getCellStyle(): ViewStyle {
        if (index === 0) {
            return styles.cellFirst
        }

        if (index === lastIndex) {
            return styles.cellLast
        }

        return styles.default;
    }

    const renderCell = useCallback((_: any, own: number) => {
        return <Cell matrix={matrix} key={`cell${index}${own}${config.id}`} config={config} parentIndex={index} ownIndex={own} />
    }, [index, matrix]);

    const cells = useMemo(() => {
        if (matrix && matrix.length > 0) {
            return matrix[index].map(renderCell)
        }
        return <View />
    }, [matrix, index])


    const rowCells = useMemo(() => {
        return (
            <View>
                <Pressable style={getCellStyle()}>
                    <Text style={[styles.text, TableStatic.textStyle]} >{config.title}</Text>
                </Pressable>
                    {cells}
            </View>
        )
    }, [config, matrix])

    return (
        <View style={{flex: 1}} >
            {rowCells}
        </View>
    )
}

const styles = StyleSheet.create({
    cellFirst: {
        flex: 1,
        width: "auto",
        minHeight: 40,
        backgroundColor: "blue",
        borderTopLeftRadius: 8,
        borderRightWidth: 1,
        borderRightColor: "#DCDCDC",
        justifyContent: "center",
        alignItems: "center",
    },
    cellLast: {
        flex: 1,
        width: "auto",
        minHeight: 40,
        backgroundColor: "blue",
        borderTopRightRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    default: {
        flex: 1,
        width: "auto",
        minHeight: 40,
        backgroundColor: "blue",
        borderRightWidth: 1,
        borderRightColor: "#DCDCDC",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white"
    }
})

export default HeaderCell;