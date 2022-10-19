import { DateTimeFormatList } from "../types";
import { TableStatic } from "../utils";
import DateTimeFormatter from "../utils/DateTimeFormatter";

beforeEach(() => {
	TableStatic.clear();
});

describe("Date and time formatting tests", () => {
	const dateStr = "December 17, 2022 03:24:00";

	test("ISO format", () => {
		const utc = new Date(dateStr).toISOString();
		const formatedDate = DateTimeFormatter.formatDate(dateStr).toString();
		expect(formatedDate).toBe(utc);
	});


	describe("Locale tests", () => {

		test("Global locale settings", () => {
			TableStatic.locale = "ru";
			const formatedDate = DateTimeFormatter.formatDate(dateStr, DateTimeFormatList.YearMonth).toString();
			expect(formatedDate).toBe("декабрь, 2022");
		});

		test("Global locale settings, ignore local configured locale", () => {
			TableStatic.locale = "ru";
			const formatedDate = DateTimeFormatter.formatDate(dateStr, DateTimeFormatList.YearMonth, "de").toString();
			expect(formatedDate).toBe("декабрь, 2022");
		});

		test("Local configured locale", () => {
			const formatedDate = DateTimeFormatter.formatDate(dateStr, DateTimeFormatList.YearMonth, "de").toString();
			expect(formatedDate).toBe("Dezember, 2022");
		});

		test("Without locale, use default", () => {
			const formatedDate = DateTimeFormatter.formatDate(dateStr, DateTimeFormatList.YearMonth).toString();
			expect(formatedDate).toBe("December, 2022");
		});

		test("With global date pattern, with locale", () => {
			TableStatic.customFormattingPattern = "hh";
			const formatedDate = DateTimeFormatter.formatDate(dateStr, undefined, "ru").toString();
			expect(formatedDate).toBe("03");
		});

		test("With global date pattern, withot locale", () => {
			TableStatic.customFormattingPattern = "hh";
			const formatedDate = DateTimeFormatter.formatDate(dateStr).toString();
			expect(formatedDate).toBe("03");
		});

	});
	

});