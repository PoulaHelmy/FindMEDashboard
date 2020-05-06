import { Component } from '@angular/core';
import { toggleFade } from '@@shared/animation/toggle-fade';
import { ApiService } from '@@core/http/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [toggleFade],
})
export class AppComponent {
  title = 'findme';

  constructor(private apiSerivce: ApiService) {}
} //end of class
