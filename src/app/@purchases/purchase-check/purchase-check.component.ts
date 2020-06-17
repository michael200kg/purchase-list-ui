import {Component, OnInit} from '@angular/core';
import {Purchase, PurchaseItemService, PurchaseService} from "../../@api-module";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-purchase-edit',
    templateUrl: './purchase-check.component.html',
    styleUrls: ['./purchase-check.component.css']
})
export class PurchaseCheckComponent implements OnInit {

    public purchase: Purchase;
    public title: string;
    public buttonLabel: string
    public mode: string

    constructor(private fb: FormBuilder,
                private purchaseService: PurchaseService,
                private purchaseItemService: PurchaseItemService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(x => {
            let id = Number(x.get('purchaseId'));
            if (id > 0) {
                this.purchaseService.getPurchaseById(id).subscribe(p => {
                        this.purchase = p;
                        this.mode = 'UPDATE';
                    }
                )
            }

        });
        this.title = 'Изменение списка';
        this.buttonLabel = 'OK';

    }

    toggle(itemId_: number) {
        this.purchaseItemService.togglePurchaseItem(itemId_).subscribe(() => {
            this.purchase.items.forEach(x => {
                if (x.id === itemId_) {
                    if (x.checked) {
                        x.checked = false;
                        x.checkedDate = null;
                    } else {
                        x.checked = true;
                        x.checkedDate = new Date();
                    }
                }

            });
        });
    }

    cancel() {
        this.router.navigate(['list']).then(() => {
        });
    }

}
