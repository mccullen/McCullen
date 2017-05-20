import { boardFactory } from "./boardFactory";


describe("Board Factory", function () {

    it("Creates a board", function () {

        expect(boardFactory.test).toBe("hello");
        //expect(false).toBe(true);
    });
    it("Does some other stuff", () => {
        let isDone: boolean = false;
        expect("test").toEqual("test");
        //expect(isDone).toBe(true);
        //expect(test).toEqual("typescript");
    });
});