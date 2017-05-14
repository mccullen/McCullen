import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

/*
import { boardFactory } from "./boardFactory";
var boardFactory2 = boardFactory as any;
boardFactory2.test = "hi";
var jeff = {
    test: "someValue" as string
};
jeff.test = "myprop";
*/
export class Shell {
    //public prop: any = boardFactory.test;
    public prop: any = "hi";

    public router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            {
                route: ["", "list"],
                name: "list",
                moduleId: PLATFORM.moduleName("./list"),
                nav: false
                //,title: "Projects"
            },
            {
                route: "tic-tac-toe",
                name: "tic-tac-toe",
                moduleId: PLATFORM.moduleName("./tic-tac-toe/tic-tac-toe"),
                nav: true,
                title: "Tic-Tac-Toe"
            }
        ]);
        this.router = router;
    }
}