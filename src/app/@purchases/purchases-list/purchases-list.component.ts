import {Component, OnInit} from '@angular/core';
import {Purchase, PurchaseService} from '../../@api-module';
import {BehaviorSubject} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {PurchaseEditComponent} from '../purchase-edit/purchase-edit.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PurchaseModel} from '../model/purchase-model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-purchases-list',
    templateUrl: './purchases-list.component.html',
    styleUrls: ['./purchases-list.component.css']
})
export class PurchasesListComponent implements OnInit {

    purchases: Purchase[];
    refresh$ = new BehaviorSubject<string>('');

    constructor(private purchaseService: PurchaseService,
                private dialog: MatDialog,
                private router: Router,
                private route: ActivatedRoute) {
        this.refresh$.pipe(switchMap(x => this.purchaseService.getPurchases()))
            .subscribe(x => {
                this.purchases = x;
            });
    }

    ngOnInit() {
        this.refreshTable();
    }

    refreshTable() {
        this.refresh$.next('');
    }

    createPurchase() {

        this.router.navigate(['/app/purchases/purchase-edit', {purchaseId: 0}], { relativeTo: this.route }).then(() => {
            this.refreshTable();
        });

    }

    editPurchase(id_: number) {
        this.router.navigate(['/app/purchases/purchase-edit', {purchaseId: id_}], { relativeTo: this.route }).then(() => {
            this.refreshTable();
        });
    }

    checkPurchase(id_: number) {
        this.router.navigate(['/app/purchases/purchase-check', {purchaseId: id_}], { relativeTo: this.route }).then(() => {
            this.refreshTable();
        });
    }

    deletePurchase(id_: number) {
        if (confirm('Действительно хотите удалить этот список покупок?')) {
            this.purchaseService.deletePurchase(id_).subscribe(() => {
                this.refreshTable();
            });
        }
    }


}
