import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class TransferForm {

    private formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {
        this.formBuilder = formBuilder;
    }

    createForm():FormGroup{
        return this.formBuilder.group({
            customerId:['',Validators.required],
            amount:['',[Validators.required,Validators.min(1),Validators.max(100000)]],
        })
    }
}