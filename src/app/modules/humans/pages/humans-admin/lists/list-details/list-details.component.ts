import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceApiService } from 'app/modules/humans/services/face-api.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss'],
})
export class ListDetailsComponent implements OnInit {
  isLoadingResults = true;
  selectedListId;
  faceList;
  options = {
    title: 'Are Sure To Delete This Face',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  constructor(
    private faceApi: FaceApiService,
    private actRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.selectedListId = this.actRoute.snapshot.paramMap.get('id');
    this.faceApi.getFaceList(this.selectedListId).subscribe((res) => {
      this.faceList = res;
      this.isLoadingResults = false;
    });
  }
}
