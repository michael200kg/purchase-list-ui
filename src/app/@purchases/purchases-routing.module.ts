import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PurchasesListComponent} from "./purchases-list/purchases-list.component";
import {PurchaseEditComponent} from "./purchase-edit/purchase-edit.component";

const purchasesRoutes: Routes = [

    {
        path: 'purchase-list',
        component: PurchasesListComponent
    },
    {
        path: 'purchase-edit',
        component: PurchaseEditComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(purchasesRoutes)],
    exports: [RouterModule],
})
export class PurchasesRoutingModule {
}
