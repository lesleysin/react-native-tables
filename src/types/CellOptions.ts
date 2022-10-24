import type { ReactNode } from "react";
import type { AvailableLocales, DateTimeFormat } from "./DateTimeFormat";


type ColumnOptions = StringCellOptions | NumberCellOptions | DateTimeCellOptions | LinkCellOptions;

export class ColumnConfiguration {
	title: string;
	id?: string;
	isSortable?: boolean;
	sortIcon?: ReactNode;

	constructor(title: string, id?: string, sortIcon?: ReactNode, isSortable = false) {
		this.title = title;
		this.id = id ?? ColumnConfiguration.generateUId();
		this.isSortable = isSortable;
		this.sortIcon = sortIcon;
	}

	public static generateUId(len = 10) {
		const chrs = "abcdefghigklmnopqrstuvwxyz1234567890";
		let str = "";
		for (let i = 0; i < len; i++) {
			const pos = Math.floor(Math.random() * chrs.length);
			str += chrs.substring(pos, pos + 1);
		}
		return str;
	}

}

export class StringCellOptions extends ColumnConfiguration {
	type = "string" as const; 

	constructor(type: "string", title: string, id?: string, isSortable?: boolean) {
		super(title, id, isSortable);
		this.type = type;
	}
}

export class NumberCellOptions extends ColumnConfiguration {
	type = "number" as const;

	constructor(type: "number", title: string, id?: string, isSortable?: boolean) {
		super(title, id, isSortable);
		this.type = type;
	}
}

export class DateTimeCellOptions extends ColumnConfiguration {
	type = "date" as const;
	format: DateTimeFormat = "DateTimeISO";
	locale?: AvailableLocales;

	constructor(type: "date", title: string, format: DateTimeFormat, locale?: AvailableLocales, id?: string, isSortable?: boolean) {
		super(title, id, isSortable);
		this.type = type;
		this.format = format;
		this.locale = locale;
	}
}

export class LinkCellOptions extends ColumnConfiguration {
	type= "link" as const;

	constructor(type: "link", title: string, id?: string, isSortable?: boolean) {
		super(title, id, isSortable);
		this.type = type;
	}
}

export default ColumnOptions;
