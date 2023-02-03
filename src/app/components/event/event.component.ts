import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventTypes = ["Private", "Shared"];
  eventType = "Private"
  name : string;
  eventForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.name = '';
  }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      freshness : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],
      date : ['', Validators.required]
    })
    if(this.data) {
      this.eventForm.controls['productName'].setValue(this.data)
    }
  }

  addEvent() {
    if(this.eventForm.valid) {
      // services
      this.eventForm.reset();
      this.dialogRef.close('save');
    }
  }

}
