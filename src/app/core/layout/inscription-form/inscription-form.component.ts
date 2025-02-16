import { Component, inject } from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormsModule,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { MatStepperModule } from '@angular/material/stepper';
import { AsyncPipe, JsonPipe, KeyValuePipe, TitleCasePipe } from '@angular/common';
import { BehaviorSubject, map } from 'rxjs';
import FileUploadComponent from './file-upload.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    TitleCasePipe,
    KeyValuePipe,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatLabel,
    MatRadioModule,
    MatCardModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class InscriptionFormComponent {
  private fb = inject(FormBuilder);

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }
  formGroup:FormGroup = this.fb.group({
    formArray: this.fb.array([
      this.fb.group({
        reqState: [null, Validators.required],
      }),
      this.fb.group({
        _00sobrenombre: null,
        _01nombres: [null, Validators.required],
        _02apellido1: [null, Validators.required],
        _03apellido2: [null, Validators.required],
        _04address1: [null, Validators.required],
        _05address2: null,
        _06ciudad: [null, Validators.required],
        _07municipio: [null, Validators.required],
        _08estado: [null, Validators.required],
        _09pais: [null, Validators.required],
        _10postalCode: [null, Validators.required],
        _11genero: [null, Validators.required],
      }),
      this.fb.group({
        _12email: [null, Validators.required],
        _13telefono: [null, Validators.required],
        // canEmail: [null, Validators.required ],
        // canCall: [null, Validators.required],
        // canSMS: [null, Validators.required],
        // canWA: [null, Validators.required],
        _14horario: [null, Validators.required],
        _15referencia: [null, Validators.required],
        _16emer_name: [null, Validators.required],
        _17emer_relation: [null, Validators.required],
        _18emer_telefono: [null, Validators.required],
        _19ss_name: [null, Validators.required],
        _20nss: [null, Validators.required],
        _21alergias: [null, Validators.required],
        _22padecimientos: [null, Validators.required],
        _23medicamentos: [null, Validators.required],
        _24sangre: [null, Validators.required],
      }),
      this.fb.group({
        ine: [null, Validators.required],
      }),
      this.fb.group({
        recipment: [null, Validators.required],
      }),
      this.fb.group({
        photo: [null, Validators.required],
      }),
    ]),
  });
  // selectedMunis = this.formGroup.get([0])!.valueChanges.pipe(
  //   map((value:any) => (value != null ? this.municipios[value] : []))
  // );

  isEditable: boolean = true;
  hasUnitNumber = false;
  base64textString: BehaviorSubject<string> = new BehaviorSubject('');
  imageSource1: BehaviorSubject<any> = new BehaviorSubject('');
  imageSource2: BehaviorSubject<any> = new BehaviorSubject('');
  imageSource3: BehaviorSubject<any> = new BehaviorSubject('');

  catfile: string = '';
  constructor(private sanitizer: DomSanitizer) {}

  handleFileSelect(evt: any) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    console.log(readerEvt)
    this.base64textString.next(btoa(binaryString));
    let imageOnData = `data:image/png;base64, ${btoa(binaryString)}`;
    switch (this.catfile) {
      case 'ine':
        console.log('control for '+this.catfile)
        this.formArray
          ?.get([3])!
          .patchValue({ine:imageOnData});
        this.imageSource1.next(
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/png;base64, ${btoa(binaryString)}`
          )
        );
        break;
      case 'recipment':
        console.log('control for '+this.catfile)
        this.formArray
          ?.get([4])!
          .patchValue({recipment:`${imageOnData}`});
        this.imageSource2.next(
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/png;base64, ${btoa(binaryString)}`
          )
        );
        break;
      case 'photo':
        console.log('control for '+this.catfile)
        this.formArray
          ?.get([5])!
          .patchValue({photo:`${imageOnData}`});
        this.imageSource3.next(
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/png;base64, ${btoa(binaryString)}`
          )
        );
        break;
      default:
        break;
    }
  }
  onSubmit(): void {
    console.log(this.formGroup.value);
    //alert('Thanks!');
  }
}
