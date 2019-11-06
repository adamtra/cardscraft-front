import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatStepper } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit, OnDestroy {

  @ViewChild('stepper', {static: true}) stepper: MatStepper;

  public paramsForm: FormGroup;
  public stepperForm: FormGroup;
  public isNew = true;
  
  private id: any;
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
    })
  }

  save() {
    this.saving = true;
    if (this.isNew) {
      this.card.add(this.paramsForm.value).subscribe((id) => {
        this.saving = false;
        this.router.navigate(['/admin-panel/card/' + id]);
        this.stepper.next();
      }, () => {
        this.saving = false;
      });
    }
  }

  get isDisabled() {
    return this.paramsForm.invalid || this.saving;
  }

}
