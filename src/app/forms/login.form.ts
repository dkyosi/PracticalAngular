import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginForm {

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm():FormGroup{
        return this.formBuilder.group({
            customerId:['',[Validators.required]],
            pin:['',[Validators.required,Validators.minLength(4),Validators.maxLength(6)]],
        })
    }
}