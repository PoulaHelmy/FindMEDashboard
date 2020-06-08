import { Component, OnInit } from '@angular/core';
import { InputBoxService } from '../input-box/input-box.service';
import { FaceApiService } from '../../services/face-api.service';
import * as _ from 'lodash';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class Configuration2Component implements OnInit {
  loading = false;
  personFaces = [];
  personGroups = [];
  personList = [];
  selectedGroupId = '';
  selectedPerson: any;

  constructor(
    private faceApi: FaceApiService,
    private inputBox: InputBoxService
  ) {}

  ngOnInit() {
    this.faceApi
      .getPersonGroups()
      .subscribe((data) => (this.personGroups = data));
  }

  addPersonGroup() {
    this.inputBox
      .show('Add Person Group', 'Person Group Name:')
      .then((result) => {
        let newPersonGroup = {
          personGroupId: _.kebabCase(result),
          name: result,
        };
        this.faceApi.createPersonGroup(newPersonGroup).subscribe((data) => {
          this.personGroups.push(newPersonGroup);
          this.selectedGroupId = newPersonGroup.personGroupId;
          this.onGroupsChange();
        });
      });
  }

  deletePersonGroup() {
    this.faceApi.deletePersonGroup(this.selectedGroupId).subscribe(() => {
      _.remove(
        this.personGroups,
        (x) => x.personGroupId === this.selectedGroupId
      );
      this.selectedGroupId = '';
    });
  }

  onGroupsChange() {
    if (this.selectedGroupId) {
      this.loading = true;
      this.faceApi.getPersonsByGroup(this.selectedGroupId).subscribe((data) => {
        this.personList = data;
        this.selectedPerson = null;
        this.personFaces = [];
        this.loading = false;
      });
    }
  }

  personClick(person) {
    this.selectedPerson = person;
    this.faceApi
      .getPersonFaces(this.selectedGroupId, this.selectedPerson.personId)
      .subscribe((data) => {
        this.personFaces = data;
      });
  }

  addPerson() {
    this.inputBox.show('Add Person', 'Person Name:').then((result) => {
      let newPerson: any = { name: result };
      this.faceApi
        .createPerson(this.selectedGroupId, { name: result })
        .subscribe((data) => {
          newPerson.personId = data.personId;
          this.personList.push(newPerson);
          this.selectedPerson = newPerson;
        });
    });
  }

  deletePerson(personId) {
    this.faceApi
      .deletePerson(this.selectedGroupId, this.selectedPerson.personId)
      .subscribe(() => {
        _.remove(
          this.personList,
          (x) => x.personId === this.selectedPerson.personId
        );
        this.selectedPerson = null;
      });
  }

  addPersonFace() {
    this.inputBox.show('Add Face', 'URL:').then((result) => {
      this.faceApi
        .addPersonFace(
          this.selectedGroupId,
          this.selectedPerson.personId,
          result
        )
        .subscribe((data) => {
          let newFace = {
            persistedFaceId: data.persistedFaceId,
            userData: result,
          };
          this.personFaces.push(newFace);
        });
    });
  }

  deletePersonFace(persistedFaceId) {
    this.faceApi
      .deletePersonFace(
        this.selectedGroupId,
        this.selectedPerson.personId,
        persistedFaceId
      )
      .subscribe(() => {
        _.remove(
          this.personFaces,
          (x) => x.persistedFaceId === persistedFaceId
        );
      });
  }

  trainPersonGroup() {
    this.loading = true;
    this.faceApi.trainPersonGroup(this.selectedGroupId).subscribe(() => {
      this.loading = false;
    });
  }

  getGroupTrainingStatus() {
    this.loading = true;
    this.faceApi
      .getPersonGroupTrainingStatus(this.selectedGroupId)
      .subscribe((result) => {
        switch (result.status) {
          case 'succeeded':
            break;
          case 'running':
            break;
          case 'failed':
            break;
          default:
            break;
        }
        this.loading = false;
      });
  }
}
