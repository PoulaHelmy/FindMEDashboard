import { Component, OnInit, ViewChild } from '@angular/core';
import { FaceApiService } from '../../services/face-api.service';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-face-tester',
  templateUrl: './face-tester.component.html',
  styleUrls: ['./face-tester.component.scss'],
})
export class FaceTesterComponent implements OnInit {
  loading = false;
  detectedFaces: any;
  identifiedPersons = [];
  imageUrl: string;
  multiplier: number;
  personGroups = [];
  selectedFace: any;
  selectedGroupId = '';
  @ViewChild('mainImg') mainImg;

  constructor(private faceApi: FaceApiService) {}

  ngOnInit() {
    this.loading = true;
    this.faceApi.getPersonGroups().subscribe((data) => {
      this.personGroups = data;
      this.loading = false;
    });
  }

  detect() {
    this.loading = true;
    this.faceApi.detect(this.imageUrl).subscribe((data) => {
      this.detectedFaces = data;
      console.log('**detect results', this.detectedFaces);
      this.loading = false;
    });
  }

  faceClicked(face) {
    this.selectedFace = face;
    if (this.selectedFace.identifiedPersonId) {
      let identifiedPerson = _.find(this.identifiedPersons, {
        personId: face.identifiedPersonId,
      });
      this.selectedFace.name = identifiedPerson.name;
    }
  }

  identify() {
    let faceIds = _.map(this.detectedFaces, 'faceId');
    this.loading = true;

    //NOTE: for Production app, max groups of 10
    this.faceApi
      .identify(this.selectedGroupId, faceIds)
      .subscribe((identifiedFaces) => {
        console.log('**identify results', identifiedFaces);
        let obsList = [];

        _.forEach(identifiedFaces, (identifiedFace) => {
          if (identifiedFace.candidates.length > 0) {
            let detectedFace = _.find(this.detectedFaces, {
              faceId: identifiedFace.faceId,
            });
            detectedFace.identifiedPerson = true;
            detectedFace.identifiedPersonId =
              identifiedFace.candidates[0].personId;
            detectedFace.identifiedPersonConfidence =
              identifiedFace.candidates[0].confidence;
            obsList.push(
              this.faceApi.getPerson(
                this.selectedGroupId,
                identifiedFace.candidates[0].personId
              )
            );
          }
        });

        // Call getPerson() for each identified face
        forkJoin(obsList).subscribe((results) => {
          this.identifiedPersons = results;
          this.loading = false;
        });
      });
  }

  imageLoaded($event) {
    this.selectedFace = null;
    this.detectedFaces = [];
    let img = this.mainImg.nativeElement;
    this.multiplier = img.clientWidth / img.naturalWidth;
  }
}
