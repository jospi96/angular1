
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {User} from '../model'
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User
  userEdit: User = {
    "name": "",
    "email": "",
    "gender": "",
    "status": ""
  }
  response: string

  constructor(private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get("user")) {
        this.userEdit = JSON.parse(params.get("user"))
      }

    })
  }


  formContron(form: NgForm, status: string, gender: string) {

    this.user = {
      "name": form.value.name,
      "email": form.value.email,
      "gender": gender,
      "status": status,

    }

    if (this.userEdit.name === "") {

      this.addUser(this.user)
    } else {

      this.editUser(this.user, "" + this.userEdit.id)


    }

  }

  addUser(user: User): void {
    this.httpService.addUser(user).subscribe((data: any) => {
      this.user = data.body
      if (data.status == 200) {
        this.setResponse("User has been created")
        this.navigate()
      } else {
        this.setResponse("User has been created, try again")
      }





    })

  }


  editUser(user: User, id: string) {
    this.httpService.editUser(user, id).subscribe((data: any) => {
      if (data.status == 200) {
        this.setResponse("User has been changed")
        this.navigate()
      } else {
        this.setResponse("Unmodified user try again")
      }

    })
  }



  setResponse(text: string) {
    this.response = text
  }
  navigate() {
    setTimeout(() => {
      this.router.navigate(["home"])
    }, 2000);
  }
}
