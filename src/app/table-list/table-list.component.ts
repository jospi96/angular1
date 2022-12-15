import { Component,OnInit, ViewChild } from '@angular/core';
import { Post, User } from '../model';
import { HttpService } from '../services/http.service';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { NumberInput } from '@angular/cdk/coercion';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})

export class TableListComponent implements OnInit {
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  @ViewChild(MatTable) table: MatTable<PeriodicElement>;
  users: User[] = []
  posts: Post[]
  @ViewChild(MatPaginator)
  paginator: MatPaginator
  inputValue: string
  page:string = "2"
  pageSize:NumberInput = 5;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getUser(`1`, `5`, "")
    localStorage.getItem("user")
  }


  getUser(page: string, forPage: string, term: string) {
    let type = this.search(term)
    let users: User[]
    this.inputValue = term
    this.httpService.getUserList(page, forPage, type, term).subscribe((response) => {
      users = response.body
      this.users = []
      this.users.push(...users)
      this.page = "0"
      this.page = response.headers.get("X-Pagination-Total")
    })
  }

  ngAfterViewInit() {
    
    this.pageSize=this.paginator.pageSize
    
    this.paginator.page
      .pipe(

        tap(() => {
          this.getUser(`${this.paginator.pageIndex + 1}`, `${this.paginator.pageSize}`, this.inputValue)
        })
      ).subscribe()
  }



  search(term: string) {
    if (term == "") {
      return "name"
    } else {
      let temp = term.split("@")
      console.log(temp)
      if (temp.length > 1) {
        return "email"
      }
      else {
        return "name"
      }
    }
  }


  deleteUser(id: string, user: User) {
    this.httpService.deleteUser(id).subscribe(response => {
      this.renderTable(user)
    })
  }

  renderTable(user: User) {
    let ind = this.users.indexOf(user)
    this.users.splice(ind, 1)
    this.table.renderRows();
  }




}
