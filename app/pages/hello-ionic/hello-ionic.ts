//import {Page} from 'ionic-angular';
import {IonicApp, Modal, Platform, NavController, NavParams, Page, ViewController} from 'ionic-angular';

import {Radio} from '../../services/radio';
import {RadioService} from '../../services/radio.service';


@Page({
  templateUrl: 'build/pages/hello-ionic/hello-ionic.html',
  providers: [RadioService]
})
export class HelloIonicPage {
  statsTitle: String = '';
  fullTitle: Array;
  title: String;
  artist: String;
  album: String;
  coverUrl: String;
  data: any;

  constructor(
      public nav: NavController,
      private _radioService: RadioService
  ) {}

  openModal(characterNum) {
    let modal = Modal.create(ModalsContentPage, characterNum);
    this.nav.present(modal);
  }

  nowPlaying() {
    this._radioService.pollStats().subscribe(
        data => {
          this.data = data;
          if (data.icestats.source[1].title !== this.statsTitle){
            this.statsTitle = data.icestats.source[1].title;
            this.fullTitle = this.statsTitle.split('__');
            this.getTrackInfo(this.fullTitle[0], this.fullTitle[1], this.fullTitle[2]);
          }
        },
        err => console.log(err)
    );
  }

  getTrackInfo(artist, title, album) {
    this._radioService.getSongInfo(artist, title, album).subscribe(
      data => {
        // console.log(data);
        this.title = data[0].title;
        this.artist = data[0].artist;
        this.album = data[0].album;
        this.coverUrl = `https://s3.eu-central-1.amazonaws.com/smx-static/RaiNAS_1/RaiNAS/music/live/covers/${data[0].cover}`;

      },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.nowPlaying();
    //this.getTrackInfo();
  }
}

//
//@Page({
//  templateUrl: './build/pages/modals/basic/template.html'
//})
//export class BasicPage {
//  constructor(public nav: NavController) { }
//
//  openModal(characterNum) {
//    let modal = Modal.create(ModalsContentPage, characterNum);
//    this.nav.present(modal);
//  }
//}

@Page({
  templateUrl: './build/pages/hello-ionic/modal-content.html'
})
class ModalsContentPage {
  character;

  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
