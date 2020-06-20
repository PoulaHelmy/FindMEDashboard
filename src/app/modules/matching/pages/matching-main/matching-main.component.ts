import { Component, OnInit } from '@angular/core';
import { ToasterService, Toast } from 'angular2-toaster';
import { ApiService } from '@@core/http/api.service';
@Component({
  selector: 'app-matching-main',
  templateUrl: './matching-main.component.html',
  styleUrls: ['./matching-main.component.scss'],
})
export class MatchingMainComponent implements OnInit {
  isLoadingResults = false;

  constructor(
    private toasterService: ToasterService,
    private apiServ: ApiService
  ) {}

  ngOnInit(): void {}
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }
  matching() {
    this.isLoadingResults = true;

    this.popToast({
      type: 'success',
      title: 'Automatic Matching Initiating...',
      body: 'It will take Alot of Time...',
      showCloseButton: true,
    });
    this.apiServ.MAtching().subscribe(
      (res) => {
        this.popToast({
          type: 'success',
          title: 'Automatic Matching Complete...',
          showCloseButton: true,
        });
        this.isLoadingResults = false;
      },
      (err) => {
        this.popToast({
          type: 'error',
          title: 'There Are an Error Please Try again Later',
          showCloseButton: true,
        });
        this.isLoadingResults = false;

        console.log('err : ', err);
      }
    );
  }
}
