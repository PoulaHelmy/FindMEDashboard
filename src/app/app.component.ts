import { toggleFade } from '@@shared/animation/toggle-fade';

import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [toggleFade],
})
export class AppComponent {
  title = 'AngularMaterialDynamicThemes';

  constructor() {
    // Set default theme here:
  }
  ngOnInit(): void {}
}
