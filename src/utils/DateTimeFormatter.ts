import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/de";
import "dayjs/locale/en-gb";

import TableStatic from "./TableStatic";

import type { DateTimeFormat } from "../types/DateTimeFormat";

class DateTimeFormatter {
    
	static formatDate(date: Date | string, format?: DateTimeFormat, locale?: string) {
		if (format === "DateTimeISO" || !format) {
			return dayjs(date).toISOString();
		}
        
		if (TableStatic.locale) {
			console.log(TableStatic.locale);
			return dayjs(date).locale(TableStatic.locale).format(TableStatic.customFormattingPattern ?? format);
		}

		if (!locale) {
			return dayjs(date).format(TableStatic.customFormattingPattern ?? format);
		}

        
		return dayjs(date).locale(TableStatic.locale ?? locale).format(TableStatic.customFormattingPattern ?? format);
	}

}

export default DateTimeFormatter;