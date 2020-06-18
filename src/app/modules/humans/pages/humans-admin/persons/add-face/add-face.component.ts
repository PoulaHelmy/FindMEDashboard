import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FaceApiService } from 'app/modules/humans/services/face-api.service';
import { ToasterService, Toast } from 'angular2-toaster';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-add-face',
  templateUrl: './add-face.component.html',
  styleUrls: ['./add-face.component.scss'],
})
export class AddFaceComponent implements OnInit {
  isLoadingResults = false;
  faceForm: FormGroup;
  selectedGroupId;
  selectedPersonId;
  options = {
    title: 'Are Sure To Delete This Person',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };
  images = [];
  @ViewChild('mainImg') mainImg;

  personList = [];
  selectedPerson = null;
  personFaces = [];

  detectedFaces: any;
  identifiedPersons = [];
  imageUrl: string;
  multiplier: number;
  personGroups = [];
  selectedFace: any;
  imgFile;
  fbbb;
  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toasterService: ToasterService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedGroupId = this.actRoute.snapshot.paramMap.get('group');
    this.selectedPersonId = this.actRoute.snapshot.paramMap.get('person');

    this.faceForm = this.fb.group({
      file: new FormControl('', [Validators.required]),
    });
  }
  popToast(toast: Toast) {
    this.toasterService.pop(toast);
  }

  onSubmit() {
    this.isLoadingResults = true;
    this.popToast({
      type: 'success',
      title: 'Upload Image Process May by Take Alot Of Time...',
      showCloseButton: true,
    });
    this.faceApi
      .addPersonFace(
        this.selectedGroupId,
        this.selectedPersonId,
        this.b64toFile(this.images[0])
      )
      .subscribe(
        (data) => {
          this.popToast({
            type: 'success',
            title: 'Person Face Added Sussessfully',
            showCloseButton: true,
          });
          this.isLoadingResults = false;
          this.router.navigateByUrl(
            `humans/person/${this.selectedPersonId}/group/${this.selectedGroupId}`
          );
        },
        (err) => {
          this.popToast({
            type: 'error',
            title: 'Some Thing Wrong Please Try Again',
            body: err['error']['message'],
            showCloseButton: true,
          });
          this.isLoadingResults = false;
        }
      );
  }
  /****************** File uploading Function************************/
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
          this.faceForm.patchValue({
            fileSource: this.images,
          });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  b64toFile(dataURI): File {
    // convert the data URL to a byte string
    const byteString = atob(dataURI.split(',')[1]);

    // pull out the mime type from the data URL
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // Convert to byte array
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Create a blob that looks like a file.
    const blob = new Blob([ab], { type: mimeString });
    blob['lastModifiedDate'] = new Date().toISOString();
    blob['name'] = 'file';

    // Figure out what extension the file should have
    switch (blob.type) {
      case 'image/jpeg':
        blob['name'] += '.jpg';
        break;
      case 'image/png':
        blob['name'] += '.png';
        break;
    }
    // cast to a File
    return <File>blob;
  }
  detect() {
    // this.loading = true;
    // this.faceApi.detect(this.imageUrl).subscribe((data) => {
    //   this.detectedFaces = data;
    //   console.log('**detect results', this.detectedFaces);
    //   this.loading = false;
    // });
  }

  faceClicked(face) {
    // this.selectedFace = face;
    // if (this.selectedFace.identifiedPersonId) {
    //   let identifiedPerson = _.find(this.identifiedPersons, {
    //     personId: face.identifiedPersonId,
    //   });
    //   this.selectedFace.name = identifiedPerson.name;
    // }
  }

  identify() {
    // let faceIds = _.map(this.detectedFaces, 'faceId');
    // this.loading = true;
    // //NOTE: for Production app, max groups of 10
    // this.faceApi
    //   .identify(this.selectedGroupId, faceIds)
    //   .subscribe((identifiedFaces) => {
    //     console.log('**identify results', identifiedFaces);
    //     let obsList = [];
    //     _.forEach(identifiedFaces, (identifiedFace) => {
    //       if (identifiedFace.candidates.length > 0) {
    //         let detectedFace = _.find(this.detectedFaces, {
    //           faceId: identifiedFace.faceId,
    //         });
    //         detectedFace.identifiedPerson = true;
    //         detectedFace.identifiedPersonId =
    //           identifiedFace.candidates[0].personId;
    //         detectedFace.identifiedPersonConfidence =
    //           identifiedFace.candidates[0].confidence;
    //         obsList.push(
    //           this.faceApi.getPerson(
    //             this.selectedGroupId,
    //             identifiedFace.candidates[0].personId
    //           )
    //         );
    //       }
    //     });
    //     // Call getPerson() for each identified face
    //     forkJoin(obsList).subscribe((results) => {
    //       this.identifiedPersons = results;
    //       this.loading = false;
    //     });
    //   });
  }
}
