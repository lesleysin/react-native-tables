import { ColumnConfiguration, DateTimeCellOptions, LinkCellOptions, NumberCellOptions, StringCellOptions } from "../types/CellOptions";

describe("ColumnConfiguration tests", () => { 
	
	test("Id genetation test", () => { 
		const id = ColumnConfiguration.generateUId(256);
		const id2 = ColumnConfiguration.generateUId();

		expect(id.length).toBe(256);
		expect(id2.length).toBe(10);
	});

	test("Instance tests", () => { 
		const config1 = new ColumnConfiguration("Title1");
		const config2 = new ColumnConfiguration("Title2", "12345");
		const str1 = new StringCellOptions("string", "title");
		const num1 = new NumberCellOptions("number", "title");
		const link = new LinkCellOptions("link", "title");
		const date = new DateTimeCellOptions("date", "title", "M/DD/YYYY hh:mm A ");

		expect(config1.id?.length).toBe(10);
		expect(config2.id).toBe("12345");
		expect(str1.id?.length).toBe(10);
		expect(num1.id?.length).toBe(10);
		expect(link.id?.length).toBe(10);
		expect(date.id?.length).toBe(10);
	});

});