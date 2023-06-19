import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class RegisterForm {

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm():FormGroup{
        return this.formBuilder.group({
            customerId:['',[Validators.required]],
            email:['',[Validators.required,Validators.email]],
            firstName:['',[Validators.required]],
            lastName:['',[Validators.required]],
            pin:['',[Validators.required,Validators.minLength(4),Validators.maxLength(6)]],
        })
    }
}