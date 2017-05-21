import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class Shell {

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