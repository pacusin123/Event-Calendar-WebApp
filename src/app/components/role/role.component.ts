import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roleForm !: FormGroup;
  constructor(
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Role
  ) {
    if (this.data) {
      this.roleForm.controls['firstName'].setValue(this.data.Name);
    }
  }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  createRole() {
    if (this.roleForm.valid) {
      var role = this.roleForm.value as Role;
      if (this.data) {
        role.RoleId = this.data.RoleId;
        role.Name = this.data.Name;
      }

      this.roleService.saveRole(role).subscribe({});
      this.roleForm.reset();
      this.dialogRef.close('save');
    }
  }

}
