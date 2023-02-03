import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from './user.component';


@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./user.component.css']
})
export class SearchUserComponent {

  displayedColumns: string[] = ['UserId', 'FirstName', 'LastName', 'Email', 'UserName', 'Password', 'Actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private matDialog: MatDialog
  ) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(p => {
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

  createUser(): void {
    this.openModalUser();
  }

  editUser(row: User): void {
    this.openModalUser(row)
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.getAllUsers())
  }


  private openModalUser(row?: User) {
    this.matDialog.open(UserComponent, {
      width: '30%',
      data: row,
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllUsers();
      }
    });
  }
}
