import broadcaster from "../utils/Broadcaster";


describe("Broadcast emitter tests", () => {

	test("fire event and reveive data", async () => { 
		let val;
		function onEventReceived(value: any) {
			val = value;
		}

		broadcaster.addListener("event1", onEventReceived);
		broadcaster.emit("event1", "testValue");

		expect(val).toBe("testValue");
	});
});