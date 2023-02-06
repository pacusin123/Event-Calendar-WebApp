import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';
import { RoleComponent } from './role.component';

@Component({
  selector: 'app-search-role',
  templateUrl: './search-role.component.html',
  styleUrls: ['./role.component.css']
})
export class SearchRoleComponent {

  displayedColumns: string[] = ['RoleId', 'Name', 'Actions'];
  dataSource!: MatTableDataSource<Role>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private roleService: RoleService,
    private matDialog: MatDialog
  ) {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getRoles().subscribe(p => {
      this.dataSource = new MatTableDataSource(p);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createRole(): void {
    this.openModalRole();
  }

  editRole(row: Role): void {
    this.openModalRole(row)
  }

  deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe(() => this.getAllRoles())
  }


  private openModalRole(row?: Role) {
    this.matDialog.open(RoleComponent, {
      width: '30%',
      data: row,
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllRoles();
      }
    });
  }

}
