import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = ContactPage;

  constructor() {

  }
}
