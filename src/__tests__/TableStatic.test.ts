import { TableStatic } from "../utils";

describe("Static table options testing", () => { 

	test("TableStatic.create method test", () => {
		TableStatic.create({
			dateCellTextStyle: {
				color: "red"
			},
			linkCellTextStyle: {
				color: "blue"
			}
		});

		expect(TableStatic.dateCellTextStyle.color).toBe("red");
		expect(TableStatic.linkCellTextStyle.color).toBe("blue");
	});

	test("TableStatic.clear method test", () => {
		TableStatic.clear();

		expect(TableStatic.dateCellTextStyle).toEqual({});
	});

});