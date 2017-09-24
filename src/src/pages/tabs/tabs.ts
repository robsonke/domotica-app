import { Component } from '@angular/core';

import { SoundPage } from '../sound/sound';
import { LightPage } from '../light/light';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LightPage;
  tab3Root = SoundPage;

  constructor() {

  }
}
