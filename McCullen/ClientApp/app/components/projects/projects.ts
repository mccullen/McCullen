import { boardFactory } from "./boardFactory";
var boardFactory2 = boardFactory as any;
boardFactory2.test = "hi";
var jeff = {
    test: "someValue" as string
};
jeff.test = "myprop";
export class Projects {
    public prop: any = boardFactory.test;
}