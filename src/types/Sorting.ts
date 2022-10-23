import { TableValues } from "./TableData";

/**
 * Sorting direction, ascendent or descendent.
 * For string comparation uses default lexicographic comparison algorithm 
 */
export type SortDirection = "ASC" | "DSC";


/**
 * @param rowIndex index of
 * @param target target value for compare with other
 * @param values all values for current row
 * 
 * @internal !!!
 */
export class SortingSignature {
	rowIndex: number;
	target: TableValues;
	values: TableValues[];


	constructor(rowIndex: number, target: TableValues, values: TableValues[]) {
		this.rowIndex = rowIndex;
		this.target = target;
		this.values = values;
	}
}