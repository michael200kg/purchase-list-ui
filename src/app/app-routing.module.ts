import {NgModule} from '@angular/core';
import {ExtraOptions, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PurchasesListComponent} from "./@purchases/purchases-list/purchases-list.component";

const routes: Routes = [
    {
        path: 'app',
        loadChildren: () => import('./@purchases/purchases.module').then(m => m.PurchasesModule)
    },
    {
        path: '**',
        redirectTo: 'app/purchase-list'
    }
];

const config: ExtraOptions = {
    enableTracing: false,
    useHash: true,
    preloadingStrategy: PreloadAllModules
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
