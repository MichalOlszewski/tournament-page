import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TournamentsService } from 'src/app/services/tournaments-service/tournaments.service';

class CustomValidators {
  static checkDeadlineDate (control: AbstractControl): ValidationErrors| undefined{
    const deadline = control.get('deadline')?.value;
    const data = control.get('data')?.value
    console.log(deadline)
    if (!((deadline < data) && deadline !== null && data !== null)){
      return {DeadlineAfterData: true}
    } else {
      return;
    }
  }
}

@Component({
  selector: 'app-tournaments-add',
  templateUrl: './tournaments-add.component.html',
  styleUrls: ['./tournaments-add.component.scss']
})
export class TournamentsAddComponent implements OnInit {
  addForm!: FormGroup;
  minDate!: Date;
  isAdded!: boolean;



  constructor(
    private formBuilder: FormBuilder,
    private tourService: TournamentsService
  ) {}

  ngOnInit(): void {
    this.isAdded = false;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();

    this.minDate = new Date(currentYear, currentMonth+1, currentDay+27);

    this.addForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      discipline: [null, [Validators.required]],
      location: [null, [Validators.required]],

      limit: [
        null, 
        [Validators.required, 
         Validators.pattern('[1-9][0-9]*')]],

      seeded_players: [
        null, 
        [Validators.required,
         Validators.pattern('[1-9][0-9]*')
      ]],
      deadline : [
        null, 
        [Validators.required]
      ],
      data : [
        null, 
        [Validators.required]
      ],
      
      
    },{
      validators: CustomValidators.checkDeadlineDate
    })
  }
  
  onSubmit(){
    return this.tourService.addTournament(this.addForm.value).pipe(
      map(() => {
        this.addForm.reset()
        this.isAdded = true;
      })
    ).subscribe()
    
  }
}
