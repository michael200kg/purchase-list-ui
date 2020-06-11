import {Component, OnInit} from '@angular/core';
import {Purchase, PurchaseItem, PurchaseService} from "../../@api-module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PurchaseModel} from "../model/purchase-model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PurchaseItemEditDialogComponent} from "./purchase-item-edit-dialog/purchase-item-edit-dialog.component";

@Component({
    selector: 'app-purchase-edit',
    templateUrl: './purchase-edit.component.html',
    styleUrls: ['./purchase-edit.component.css']
})
export class PurchaseEditComponent implements OnInit {

    public purchase: Purchase;
    public title: string;
    public buttonLabel: string
    public mode: string

    purchaseForm: FormGroup;

    constructor(private fb: FormBuilder,
                private purchaseService: PurchaseService,
                private route: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(x => {
            let id = Number(x.get('purchaseId'));
            if (id > 0) {
                this.purchaseService.getPurchaseById(id).subscribe(p => {
                        this.purchase = p;
                        this.mode = 'UPDATE';
                        this.fillFormGroup(this.purchase);
                    }
                )
            } else {
                this.purchase = new PurchaseModel(null, new Date(), false, null,
                    null, null, 'MICHAEL', false,
                    null, []);
                this.mode = 'CREATE';
                this.fillFormGroup(this.purchase);
            }

        });
        this.title = 'Изменение списка';
        this.buttonLabel = 'OK';

    }

    addGoods() {
        const newItem: PurchaseItem = {
            id: null, itemName: null, checked: false,
            itemDescription: null, purchaseId: this.purchase.id
        };
        const config: MatDialogConfig = {
          height: '100%',
            width: '100%',
            data: { item: newItem }
        };
        const editDialogRef = this.dialog.open(PurchaseItemEditDialogComponent, config);
        editDialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.purchase.items.push(editDialogRef.componentInstance.purchaseItem);
            }
        })

    }

    fillFormGroup(p_: Purchase) {
        this.purchaseForm = this.fb.group({
            name: [p_.name, [Validators.required]],
            text: [p_.text, [Validators.required]]
        });
    }

    updateEntity() {
        this.purchase.name = this.purchaseForm.get('name').value;
        this.purchase.text = this.purchaseForm.get('text').value;
    }

    resolveService(purchase_: Purchase): Observable<any> {
        return this.mode === 'UPDATE' ? this.purchaseService.editPurchase(purchase_) :
            this.purchaseService.createPurchase(purchase_);
    }

    save() {
        this.updateEntity();
        this.resolveService(this.purchase).subscribe(() => {
            this.router.navigate(['list']).then(() => {
            });
        });
    }

    cancel() {
        this.router.navigate(['list']).then(() => {
        });
    }

}
