import { boardFactory } from "./boardFactory";


describe("Board Factory", function () {

    it("Creates a board", function () {

        expect(boardFactory.test).toBe("hello");
        //expect(false).toBe(true);
    });
    it("Does some other stuff", () => {
        //let test: string = "typescript";
        expect("test").toEqual("test");
        //expect(test).toEqual("typescript");
    });
});