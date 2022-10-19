import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/de";
import "dayjs/locale/en-gb";

import TableStatic from "./TableStatic";

import type { DateTimeFormat } from "../types/DateTimeFormat";

class DateTimeFormatter {
    
	static formatDate(date: Date | string, format?: DateTimeFormat, locale?: string) {
		const targetLocale = TableStatic.locale ?? locale;

		if (TableStatic.customFormattingPattern) {
			const result = dayjs(date);

			if (targetLocale) {
				return result.locale(targetLocale).format(TableStatic.customFormattingPattern);
			} else {
				return result.format(TableStatic.customFormattingPattern);
			}
		}

		if (format === "DateTimeISO" || !format) {
			return dayjs(date).toISOString();
		}
        
		if (TableStatic.locale) {
			return dayjs(date).locale(TableStatic.locale).format(TableStatic.customFormattingPattern ?? format);
		}

		if (!locale) {
			return dayjs(date).format(TableStatic.customFormattingPattern ?? format);
		}

		return dayjs(date).locale(locale).format(format);
	}

}

export default DateTimeFormatter;