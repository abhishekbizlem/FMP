import { Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import { HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  showDiv: boolean;
  
  loading = false;
  
  isLoginError : boolean = false;
  public edited = false;
  
   allErrorMessage : string;
   //public message:string;
   // @ViewChild(SignUpComponent) child;

  constructor(
  private authenticationService: AuthenticationService,
  private alertService: AlertService,
  private router : Router
  
  ) {
	  
          // redirect to home if already logged in
        if ( localStorage.getItem('currentUser')!=null ) {
            this.router.navigate(['/sign-up']);
			this.edited = true;
        }else{
			this.edited = false;
		}
		
		//this.alertService.currentMessage.subscribe(allErrorMessage => this.allErrorMessage = allErrorMessage);
		
	  }
	  
	/*   ngAfterViewInit() {
    this.allErrorMessage = this.child.allErrorMessage
  }
 */
  ngOnInit() {
    this.showDiv = true;
	//this.alertService.currentMessage.subscribe(allErrorMessage => this.allErrorMessage = allErrorMessage)
	//this.allErrorMessage = this.child.allErrorMessage
	
  }
  changeDiv(val: String) {
    if (val == 'user')
      this.showDiv = false;
    else
      this.showDiv = true;
  }
  
  loginSave(loginForm : NgForm){
	  
	   // stop here if form is invalid
        if (loginForm.invalid) {
            return;
        }
	 
	 this.loading = true;
	 var datajson=JSON.stringify(loginForm.value);
         console.log( 'loginForm!::' + datajson );
		 
		 var loginJson=loginForm.value;
		 
		 let params = new HttpParams()
            .set('userid', loginJson.username)
            .set('password', loginJson.password)
	  
     //this.authenticationService.userAuthentication(loginForm.value)
	 this.authenticationService.userAuthentication(params)
	 .pipe(first())
	 .subscribe((data : any)=>{
		 console.log(JSON.stringify(data));
	 console.log(data.ResponseCode);
		 if(data.ResponseCode=="1"){
			 var userJson=data.User;
			 localStorage.setItem('currentUser',userJson.Name);
             this.router.navigate(['/sign-up']);
		 }else{
			 this.isLoginError = true;
	         this.loading = false;
			 loginForm.reset();
		 }
		 
         
    },
    (error : any)=>{
		 console.log(error);
      this.isLoginError = true;
	  this.loading = false;
	  loginForm.reset();
	  //this.router.navigate(['/sign-in']);  //take current url
    });
  }
  
  

}
