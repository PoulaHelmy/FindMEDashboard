import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FaceApiService} from 'app/modules/humans/services/face-api.service';
import {ToasterService, Toast} from 'angular2-toaster';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import {ItemsService} from '@@core/services/items.service';
import {delay, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-test-face-identification',
  templateUrl: './test-face-identification.component.html',
  styleUrls: ['./test-face-identification.component.scss'],
})
export class TestFaceIdentificationComponent implements OnInit {
  isLoadingResults = false;
  faceForm: FormGroup;
  images = [];
  persons = [];
  confidence;
  numberOfPersons;
  itemDetails;

  constructor(
    private router: Router,
    private faceApi: FaceApiService,
    private toasterService: ToasterService,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder,
    private itemServ: ItemsService
  ) {
  }

  ngOnInit(): void {
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
    this.faceApi.detect(this.b64toFile(this.images[0])).subscribe(
      (res) => {
        this.faceApi.identify('maingroup', [res[0]['faceId']]).subscribe((result) => {
          if (result[0]['candidates'][0]) {
            this.isLoadingResults = false;
            this.faceApi
              .getPerson('maingroup', result[0]['candidates'][0]['personId'])
              .subscribe((data) => {
                this.popToast({
                  type: 'success',
                  title: 'There is SomeOne Similar To This Person In The Image',
                  showCloseButton: true,
                });
                this.router.navigateByUrl('/humans/persons/details', {
                  state: {
                    itemName: data['name'],
                    personId: data['personId'],
                  },
                });
              });
          } else {
            this.popToast({
              type: 'error',
              title: 'No One Similar To This Person...',
              body:
                'But You Can Add This Person To Help US to Find This Person',
              showCloseButton: true,
            });
            this.router.navigateByUrl('/humans/persons/create');
          }
        });
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
    const blob = new Blob([ab], {type: mimeString});
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
    return <File> blob;
  }
} //end of Class
