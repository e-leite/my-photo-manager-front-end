import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IbgeApiService } from '../shared/ibge-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../shared/events.service';
import { Event } from '../shared/models/event.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.scss'],
})
export class EventsFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EventsFormComponent>,
    public ibgeApiService: IbgeApiService,
    private eventsService: EventsService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) {}

  // @ViewChild('img', { static: true }) img!: any;
  // ngAfterViewInit(): void {
  //   const imageWidth = this.img.nativeElement.naturalWidth;
  //   const imageHeight = this.img.nativeElement.naturalHeight;
  //   this.setImageOriantation(imageWidth, imageHeight);
  // }

  states: any;
  cities: any;
  selectedState: string = 'AC';
  selectedCity!: string;

  fileFolder!: FileList;
  selectedFileData: any;
  url: any = '../../assets/default_image.jpg';

  bigImg = false;

  form!: FormGroup;

  ngOnInit(): void {
    this.ibgeApiService.getStates().subscribe((states) => {
      this.states = states;

      this.getCities();
    });

    this.form = this.formBuilder.group({
      id: [null],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      place: [null, [Validators.required, Validators.minLength(2)]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      progressStatus: [null],
      status: [null],
      urlImage: [null],
    });

    if (this.data) {
      this.form.patchValue({
        id: this.data.id,
        name: this.data.name,
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        place: this.data.place,
        progressStatus: this.data.progressStatus,
        status: this.data.status,
        state: this.data.state,
        city: this.data.city,
      });
      this.url = this.data.urlImage;
      this.selectedState = this.data.state;
      this.getCities();
    }
  }

  public onSelectState(): void {
    this.getCities();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const event: Event = this.form.value;
      if (event.id) {
        this.eventsService.edit(event);
      } else {
        this.eventsService.save(event);
      }
      this.dialogRef.close();
    }
  }

  public getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return `Campo obrigatório.`;
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 3;
      return `Campo precisa ter no mínimo ${requiredLength} caracteres.`;
    }

    return 'Campo inválido.';
  }

  public onFolderSelect(event: any): void {
    this.selectedFileData = <FileList>event.srcElement.files;

    this.url = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(this.selectedFileData[0])
    );
  }

  onImageLoad(event: any) {
    const width = event.target.width;
    const height = event.target.height;

    this.setImageOriantation(event.target.width, event.target.height);
  }

  private setImageOriantation(width: number, height: number): void {
    if (height / width <= 0.7) {
      this.bigImg = true;
    } else {
      this.bigImg = false;
    }
  }

  private getCities(): void {
    this.ibgeApiService
      .getCitiesByState(this.selectedState)
      .subscribe((cities) => {
        this.cities = cities;
        this.selectedCity = this.cities[0].nome;
      });
  }
}
