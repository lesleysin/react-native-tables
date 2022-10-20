import { ComplexValue } from "../types";

test("Complex value instance creating", () => { 
	const complexValue = new ComplexValue({
		key1: "key1value",
		key2: "key2value"
	}, "key1");
	const val = complexValue.value[complexValue.viewablePropName as keyof typeof complexValue.value];
	expect(val).toBe("key1value");
});