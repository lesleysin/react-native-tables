import React, { FC, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { TableData } from '../../types/TableData';
import HeaderCell from '../HeaderCell/HeaderCell'
import ColumnOptions, { ColumnConfiguration } from '../../types/CellOptions';


interface ITableProps {
    config: ColumnOptions[];
    data: TableData;
    estimatedRowCount?: number;
    useGlobalComponentOptions?: boolean;
    enableHorizontalScroll?: boolean;
}

const Table: FC<ITableProps> = ({ config, data, estimatedRowCount, useGlobalComponentOptions = false, enableHorizontalScroll = false }) => {
    const [matrix, setMatrix] = useState<any[][]>([]);

    useLayoutEffect(() => {
        const size = getEstimatedSize();
        const newMatrix = createMatrix(config.length, size);
        setMatrix(newMatrix);
    }, []);

    useEffect(() => {
        if (data && data.length > 0) {
            updateMatrix(data);
        }
    }, [data])

    function createMatrix(mainLenght: number, rowCount: number) {
        const arr = new Array();
        for (let i = 0; i < mainLenght; i++) {
            arr[i] = new Array();
            for (let j = 0; j < rowCount; j++) {
                arr[i][j] = null;
            }

        }
        return arr;
    }

    function updateMatrix(data: TableData) {
        const editableData = [...matrix];
        for (let xIndex = 0; xIndex < editableData.length; xIndex++) {
            const yElement = data[xIndex];

            if (yElement === null || yElement === undefined) continue;

            for (let yIndex = 0; yIndex < yElement.length; yIndex++) {
                const value = yElement[yIndex];
                editableData[xIndex][yIndex] = value;
            }
        }
        setMatrix(editableData);
    }

    function getEstimatedSize() {
        if (data.length > 0) {
            return data.length;
        }

        if (estimatedRowCount) {
            return estimatedRowCount;
        }

        return 0;
    }

    const renderHeaderCell = useCallback((configItem: ColumnOptions, index: number) => {
        const lastIndex = config.length - 1;
        const itemId = configItem.id ? configItem.id : ColumnConfiguration.generateUId();
        configItem.id = itemId;
        return <HeaderCell matrix={matrix} key={itemId} config={configItem} index={index} lastIndex={lastIndex} />
    }, [matrix]);

    const tableColumns = useMemo(() => {
        return config.map(renderHeaderCell);
    }, [config, matrix]);

    const tableView = useMemo(() => {
        if (data.length > 0 && enableHorizontalScroll) {
            return (
                <ScrollView >
                    <ScrollView horizontal>
                        {tableColumns}
                    </ScrollView>
                </ScrollView>
            )
        }

        return (
            <ScrollView contentContainerStyle={{ flexDirection: "row", backgroundColor: "white" }} >
                {tableColumns}
            </ScrollView>
        )
    }, [data, enableHorizontalScroll, matrix])

    return (
        <View>
            {tableView}
        </View>
    );
}

export default Table;