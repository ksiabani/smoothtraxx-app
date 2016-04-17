import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';

import {Radio} from './services/radio';
import {RadioService} from './services/radio.service';


@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [RadioService]
})
class MyApp {
  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;
  stats: Radio;

  constructor(
    private app: IonicApp,
    private platform: Platform,
    private menu: MenuController,
    private _radioService: RadioService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Radio', component: HelloIonicPage , icon: 'md-radio'},
      { title: 'My Traxx', component: ListPage, icon: 'musical-note' },
      { title: 'Go Offline', component: ListPage, icon: 'settings' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

  getStats() {
    this._radioService.getStats().then(stats => this.stats = stats);
  }
}
