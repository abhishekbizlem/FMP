import { Component, OnInit } from '@angular/core';
import { NgForm ,FormGroup,Validators,FormBuilder} from '@angular/forms';
import { HttpClient,HttpParams } from '@angular/common/http';
import { SignupService } from '../services/signup.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  //registerForm: FormGroup;
  public edited = false;
   loading = false;
    submitted = false;
	 isLoginError : boolean = false;
	 isPasswordError : boolean = false;
	 isAllError: boolean = false;
	 public loggedname : string;
	 public allErrorMessage : string;
	 
	 emailId: string;
	 name: string;
	 userpassword: string;
	 confirmPassword: string;
	 Company: string;
	 Phone: string;
	 

// constructor( private http: HttpClient ) { }
constructor( 
   private _signupService: SignupService,
   private alertService: AlertService,
   private router: Router,
   private formBuilder: FormBuilder
   

 ) {
	 
	 // redirect to home if already logged in
        if ( localStorage.getItem('currentUser')!=null ) {
            this.router.navigate(['/sign-up']);
			
			this.loggedname=localStorage.getItem('currentUser');
			//document.getElementById('showuser').innerHTML = this.loggedname;
			
			this.edited = true;
			
        }else{
			this.edited = false;
		}
	// this.alertService.currentMessage.subscribe(allErrorMessage => this.allErrorMessage = allErrorMessage);
 }

  ngOnInit() {
	 // this.alertService.currentMessage.subscribe(allErrorMessage => this.allErrorMessage = allErrorMessage);
  }
  
   public register(signupForm){
	  /* let postData = {
      "periodType" : "Monthly",
      "periodSubType" : "March",
      "DTemail" : "nilesh@gmail.com"
    }; */
	
	var datajson=JSON.stringify(signupForm.value);
    console.log( 'datajson!::' + datajson );
	
	var signupJson=signupForm.value;
	//console.log("name:: "+signupJson.name);
	//console.log("signupJson:: "+signupJson);
	
	   let params = new HttpParams()
      .set('email', signupJson.emailId)
      .set('name', signupJson.name)
	  .set('password', signupJson.userpassword)
	  .set('cpassword', signupJson.confirmPassword)
	  .set('company', signupJson.Company)
	  .set('phone', signupJson.Phone) 
	  
	  if(signupJson.userpassword==signupJson.confirmPassword){
		 this.isPasswordError=false;
		  //this._signupService.register(postData)
	this._signupService.register(params)
	.pipe(first())
	.subscribe( (response : any) => {
        console.log(JSON.stringify(response));
		
		if(response.ResponseCode=="1"){
			this.alertService.success('Registration successful', true);
			// this.alertService.changeMessage("Registration successful")
            this.router.navigate(['/login']);
		 }else{
			 this.isAllError=true;
			 this.allErrorMessage=response.ResponseMessage;
			 
			 this.isLoginError = true;
	         this.loading = false;
			 signupForm.reset();
		 }
		
		  
      },
      (error : any) => {
        //console.log(error);
		this.alertService.error(error);
        this.loading = false;
		 this.isLoginError = true;
		 signupForm.reset();
		// this.router.navigate(['/sign-up']);
      });
	  }
	  else{
		  this.isPasswordError=true;
		  this.loading = false;
		 // signupForm.reset();
	  }
	
	
	  
	  
   }


 onSubmit(signupForm:NgForm) {
	  this.submitted = true;
	  
	   this.alertService.clear();
	   
	  // stop here if form is invalid
        if (signupForm.invalid) {
            return;
        }
	 
	 this.loading = true;
	 this.register(signupForm);
 }
 
 logoutData() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
		this.edited = false;
		this.router.navigate(['/login']);
    }
	

}
