import { AvailableLocales, DateTimeFormat } from "./DateTimeFormat";


type ColumnOptions = StringCellOptions | NumberCellOptions | DateTimeCellOptions | LinkCellOptions;

export class ColumnConfiguration {
    title: string;
    id?: string;
    isSortable?: boolean;

    constructor(title: string, id?: string, isSortable = false) {
        this.title = title;
        this.id = id;
        this.isSortable = isSortable;
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

class StringCellOptions extends ColumnConfiguration {
    type: "string" = "string";
};

class NumberCellOptions extends ColumnConfiguration {
    type: "number" = "number";
};

class DateTimeCellOptions extends ColumnConfiguration {
    type: "date" = "date";
    format: DateTimeFormat = "DateTimeISO";
    locale?: AvailableLocales;
};

class LinkCellOptions extends ColumnConfiguration {
    type: "link" = "link";
}

export default ColumnOptions;
