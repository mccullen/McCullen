import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class Shell {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'McCullen';
        config.map([{
            route: ['', 'home'],
            name: 'home',
            settings: { icon: 'home' },
            moduleId: PLATFORM.moduleName('../home/home'),
            nav: true,
            title: 'Home'
        }, {
            route: 'counter',
            name: 'counter',
            settings: { icon: 'education' },
            moduleId: PLATFORM.moduleName('../counter/counter'),
            nav: true,
            title: 'Counter'
        }, {
            route: 'fetch-data',
            name: 'fetchdata',
            settings: { icon: 'th-list' },
            moduleId: PLATFORM.moduleName('../fetchdata/fetchdata'),
            nav: true,
            title: 'Fetch data'
        }, {
            route: 'projects',
            name: 'projects',
            settings: { icon: 'knight' },
            moduleId: PLATFORM.moduleName('../projects/shell'),
            nav: true,
            title: 'Projects'
        }]);

        this.router = router;
    }
}