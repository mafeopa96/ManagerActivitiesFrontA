import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivityService } from '../../services/activity.service';
import { ListService } from '../../services/list.service';
import { Activity } from 'src/app/models/Activity';

@Component({
  selector: 'app-RegistryActivity',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryActivityComponent implements OnInit {
  form: FormGroup;
  states;
  employees;
  data;
  activity: Activity;



  constructor(
    private dialogRef: MatDialogRef<RegistryActivityComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private activityService: ActivityService,
    private listService: ListService
  ) {
    this.data = data;
  }


  ngOnInit(): void {
    this.activity = new Activity();
    this.getEmployees();
    this.getStates();
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      employee: new FormControl('', Validators.required),
    })
    this.loadDatos();
  }

  loadDatos() {
    if (this.data['update']) {
      this.form.get("name").setValue(this.data['name'])
      this.form.get("state").setValue(this.data['idState'])
      this.form.get("date").setValue(new Date(this.data['date']))
      this.form.get("employee").setValue(this.data['employee'])
    }
  }

  async getEmployees() {
    try {
      this.employees = await this.listService.getEmployees().toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async getStates() {
    try {
      this.states = await this.listService.getStates().toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  action() {
    if (this.data['update']) {
      this.updateActivity();
    } else {
      this.addActivity();
    }
  }

  async addActivity() {
    this.activity.employee= this.form.get("employee").value,
    this.activity.state= this.form.get("state").value,
    this.activity.dateAdmission= this.form.get("date").value,
    this.activity.name= this.form.get("name").value
    
    await this.activityService.regitryActivity(this.activity);
    this.dialogRef.close();
  }

  async updateActivity() {
    this.activity.employee= this.form.get("employee").value,
    this.activity.state= this.form.get("state").value,
    this.activity.dateAdmission= this.form.get("date").value,
    this.activity.name= this.form.get("name").value

    await this.activityService.updateActivity(this.activity)
  
    this.dialogRef.close();
  }

}
