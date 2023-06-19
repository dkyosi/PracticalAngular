import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class WithdrawForm {

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm():FormGroup{
        return this.formBuilder.group({
            amount:['',[Validators.required,Validators.min(1),Validators.max(100000)]],
        })
    }
}