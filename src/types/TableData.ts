/* eslint-disable @typescript-eslint/ban-types */

import type { Nullable } from "./Nullable";

type PrimitiveValue = string | number | Date;

export class ComplexValue {
	value: Object;
	viewablePropName: string;

	constructor(value: Object, viewablePropName: string) {
		this.value = value;
		this.viewablePropName = viewablePropName;
	}
}

export type TableValues = Nullable<PrimitiveValue> | ComplexValue;

export type TableData = Nullable<TableValues[]>[];