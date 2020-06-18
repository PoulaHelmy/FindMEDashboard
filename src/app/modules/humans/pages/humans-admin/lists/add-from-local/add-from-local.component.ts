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
  selector: 'app-add-from-local',
  templateUrl: './add-from-local.component.html',
  styleUrls: ['./add-from-local.component.scss'],
})
export class AddFromLocalComponent implements OnInit {
  isLoadingResults = false;
  faceForm: FormGroup;
  selectedListId;
  images = [];
  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toasterService: ToasterService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedListId = this.actRoute.snapshot.paramMap.get('id');
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
      .addFaceFromLocal(this.selectedListId, this.b64toFile(this.images[0]))
      .subscribe(
        (data) => {
          this.popToast({
            type: 'success',
            title: 'Person Face Added Sussessfully',
            showCloseButton: true,
          });
          this.isLoadingResults = false;
          this.router.navigateByUrl(`humans/list/${this.selectedListId}`);
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
}
