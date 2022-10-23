
import { TableData } from "../types";
import { SortDirection, SortingSignature } from "../types/Sorting";
import { ComplexValue, TableValues } from "../types/TableData";

function useSorting() {

	function customASCSorter(elem1: SortingSignature, elem2: SortingSignature) {
		if (elem1.target instanceof ComplexValue) {
			return -1;
		}

		if (!elem1.target && !elem2.target) {
			return 0;
		}

		if (!elem1.target) {
			return -1;
		}

		if (!elem2.target) {
			return 1;
		}


		return elem1.target > elem2.target ? 1 : -1;
	}

	function customDSCSorter(elem1: SortingSignature, elem2: SortingSignature) {
		if (elem1.target instanceof ComplexValue) {
			return -1;
		}

		if (!elem1.target && !elem2.target) {
			return -1;
		}

		if (!elem1.target) {
			return 1;
		}

		if (!elem2.target) {
			return -1;
		}


		return elem1 < elem2 ? 1 : -1;
	}

	/**
	 * Function for create SortingSignatures instances for target column
	 * @param index index of target column
	 * @param matrix matrix for indexing
	 * @returns ad array of SortingSignatures instances
	 */
	function createSignature(index: number, matrix: TableData) {
		//define empty array for signatures
		const signatures: SortingSignature[] = [];
		//define variable for target column and get it from matrix
		const sortCol = matrix[index];

		if (!sortCol) {
			//return empty arr if column is empty (null)
			return signatures;
		}

		//start of row iteration
		for (let rowIndex = 0; rowIndex < sortCol.length; rowIndex++) {
			const values: TableValues[] = [];
			//get value for sorting
			const target = sortCol[rowIndex];

			//collect values of target row 
			for (let columnIndex = 0; columnIndex < matrix.length; columnIndex++) {
				const arr = matrix[columnIndex];

				if (!arr) {
					values.push(null);
				} else {
					const value = arr[rowIndex];
					values.push(value);
				}
			}
			const sign = new SortingSignature(rowIndex, target, values);
			signatures.push(sign);
            
		}
		return signatures;
	}    

	/**
	 * Function for sort matrix by target column values
	 * @param matrix current matrix
	 * @param colIndex index of target column
	 * @param dir - sort direction
	 * @returns new sorted matrix
	 */
	function sortBy(matrix: TableData, colIndex: number, dir: SortDirection) {
		//define empty arr for sorted matrix data
		const sortedMatrix = [];
      
		//create sorting signatures
		const singatures = createSignature(colIndex, matrix);

		if (dir === "ASC") {
			const sortingResult = singatures.sort(customASCSorter);
			for (let i = 0; i < matrix.length; i++) {
				const column = matrix[i] as TableValues[] | null;
				
				if (!column) {
					sortedMatrix.push(null);
					continue;
				}

				for (let j = 0; j < column.length; j++) {
					column[j] = sortingResult[j].values[i];
				}
				sortedMatrix.push(column);
			}
		}
      
		if (dir === "DSC") {
			const res = singatures.sort(customDSCSorter);
			for (let i = 0; i < matrix.length; i++) {
				const column = matrix[i] as TableValues[] | null;
				
				if (!column) {
					sortedMatrix.push(null);
					continue;
				}

				for (let j = 0; j < column.length; j++) {
					column[j] = res[j].values[i];
				}
				sortedMatrix.push(column);
			}
		}

		return sortedMatrix as TableData ;
	}

	return {sortBy};

}

export default useSorting;