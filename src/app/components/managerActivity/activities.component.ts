import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegistryActivityComponent } from 'src/app/components/registryActivity/registry.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  displayedColumns: string[] = ['state','nameActivity', 'dateAdmission', 'daysLatest', 'employee', 'update', 'delete'];
  dataSource = new MatTableDataSource()
  constructor(
    private actService: ActivityService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getActivities();
  }
  async getActivities() {
    try {
      let data = await this.actService.get('');
      this.dataSource.data = data;
    } catch (err) {
      console.log("error");

    }
  }

  async delete(id) {
    await this.actService.deleteActivity(id);
    this.getActivities();
  }

  newActivity() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      "update": false
    };
    const dialogRef = this.dialog.open(RegistryActivityComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.getActivities();
    });
  }

  updateActivity(data) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      "nameActivity": data['nameActivity'],
      "date": data['date'],
      "id": data['id'],
      "update": true,
      "idEmployee": data['idEmployee'],
      "idState": data['idState']
      
    };
    const dialogRef = this.dialog.open(RegistryActivityComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.getActivities();
    });
  }

}
