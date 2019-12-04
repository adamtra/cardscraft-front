import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatStepper } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardService } from 'src/app/services/card.service';
import { CardImageComponent } from 'src/app/shared/card-image/card-image.component';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit, OnDestroy {

  @ViewChild('stepper', {static: true}) stepper: MatStepper;
  @ViewChild('image', { static: true }) image: CardImageComponent;

  public paramsForm: FormGroup;
  public stepperForm: FormGroup;
  public isNew = true;
  public id: any;

  private saving = false;
  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private card: CardService) { }

  ngOnInit() {
    this.subscriptions.add(this.route.params.subscribe((param) => {
      this.id = param.id;
      if (this.id === 'new') {
        this.stepperForm = this.fb.group({
          isNew: [false, Validators.requiredTrue],
        });
        this.isNew = true;
        this.newForm();
      } else {
        this.id = parseInt(this.id, 10);
        this.stepperForm = this.fb.group({
          isNew: [true, Validators.requiredTrue],
        });
        this.isNew = false;
        this.newForm();
        this.getData();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  newForm() {
    this.paramsForm = this.fb.group({
      name: ['', Validators.required],
      damage: [0, Validators.compose([
        Validators.required,
        Validators.min(0),
      ])],
      health: [0, Validators.compose([
        Validators.required,
        Validators.min(0),
      ])],
      manaCost: [0, Validators.compose([
        Validators.required,
        Validators.min(0),
      ])],
    });
  }

  getData() {
    this.card.get(this.id).subscribe((data) => {
      this.paramsForm.get('name').setValue(data.name);
      this.paramsForm.get('damage').setValue(data.damage);
      this.paramsForm.get('health').setValue(data.health);
      this.paramsForm.get('manaCost').setValue(data.manaCost);
    });
  }

  save() {
    this.saving = true;
    if (this.isNew) {
      this.card.add(this.paramsForm.value).subscribe((id) => {
        this.saving = false;
        this.router.navigate(['/admin-panel/card/' + id]);
        setTimeout(() => {
          this.stepper.next();
        });
      }, () => {
        this.saving = false;
      });
    } else {
      this.card.edit(this.id, this.paramsForm.value).subscribe(() => {
        this.saving = false;
        this.getData();
      }, () => {
        this.saving = false;
      });
    }
  }

  changeImage(image: File) {
    this.image.file = null;
    this.card.setImage(this.id, image).subscribe(() => {
      this.image.getImage();
    });
  }

  get isDisabled() {
    return this.paramsForm.invalid || this.saving;
  }

}
