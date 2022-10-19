/** 
 * List of available date and time output formats
 * @param ShortDate 6/15/2009
 * @param DateISO 2005-08-09
 * @param CondensedDate Jun. 15, 2009
 * @param MonthDay June 15
 * @param YearMonth June, 2009
 * @param ShortDateShortTime 6/15/2009 1:45 PM
 * @param ShortDateLongTime 6/15/2009 1:45:30 PM
 * @param CondensedDateTime Jun. 15, 2009 1:45 PM
 * @param ShortTime 1:45 PM
 * @param LongTime 1:45:30 PM
 * @param DateTimeISO 2005-08-09T18:31:42+03:30
 */
enum DateTimeFormatList {
    ShortDate = "MM/DD/YYYY",
    CondensedDate = "MMM. DD, YYYY",
    MonthDay = "MMMM, DD",
    YearMonth = "MMMM, YYYY",
    ShortDateShortTime = "M/DD/YYYY hh:mm A ",
    ShortDateLongTime = "M/DD/YYYY hh:mm:ss A",
    CondensedDateTime = "MMM. DD, YYYY hh:mm A",
    ShortTime = "hh:mm A",
    LongTime = "hh:mm:ss A",
    DateTimeISO = "DateTimeISO",
}

export type DateTimeFormat = `${DateTimeFormatList}`;

/**
 * AvailableLocales
 * @typeParam ru - Russian
 * @typeParem en-gb  - English (Great Britain)
 * @typeParam de - Deutsch
 */
export type AvailableLocales = "ru" | "en-gb" | "de"

export default DateTimeFormatList;