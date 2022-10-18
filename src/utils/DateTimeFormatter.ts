import dayjs from 'dayjs';
import { DateTimeFormat } from '../types/DateTimeFormat';
import 'dayjs/locale/ru';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';

class DateTimeFormatter {
    
    static formatDate(date: Date | string, format: DateTimeFormat, locale?: string) {
        if (format === "DateTimeISO") {
            return dayjs(date)
        }

        if (!locale) {
            return dayjs(date).format(format);
        }

        return dayjs(date).locale(locale ?? "").format(format);
    }

}

export default DateTimeFormatter;