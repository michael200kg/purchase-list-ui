import { Component, OnInit } from '@angular/core';
import { Purchase, PurchaseItem, PurchaseService, User, UserService } from '../../@api-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseModel } from '../model/purchase-model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PurchaseItemEditDialogComponent } from './purchase-item-edit-dialog/purchase-item-edit-dialog.component';
import { UserFacade } from "../../@app-state-module";

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.css']
})
export class PurchaseEditComponent implements OnInit {

  public purchase: Purchase;
  public title: string;
  public buttonLabel: string;
  public mode: string;
  public users: User[];
  private username = 'michael';

  purchaseForm: FormGroup;

  constructor(private fb: FormBuilder,
              private purchaseService: PurchaseService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private userService: UserService,
              private userFacade: UserFacade) {
    userFacade.userState$.subscribe(x => {
      this.username = x.user.username;
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(x => {
      this.users = x;
    });
    this.route.paramMap.subscribe(x => {
      const id = Number(x.get('purchaseId'));
      if (id > 0) {
        this.purchaseService.getPurchaseById(id).subscribe(p => {
              this.purchase = p;
              this.mode = 'UPDATE';
              this.fillFormGroup(this.purchase);
            }
        );
      } else {
        this.purchase = new PurchaseModel(null, new Date(), false, null,
            null, null, this.username, false,
            null, []);
        this.mode = 'CREATE';
        this.fillFormGroup(this.purchase);
      }

    });
    this.title = 'Изменение списка';
    this.buttonLabel = 'OK';

  }

  addItem() {
    const itemName = this.purchaseForm.get('itemName').value;
    if (itemName) {
      const newItem: PurchaseItem = {
        id: null, itemName, checked: false,
        itemDescription: null, purchaseId: this.purchase.id
      };
      this.purchase.items.push(newItem);
      this.purchaseForm.get('itemName').patchValue(null);
    }

  }

  deleteItem(id_: number) {
    this.purchase.items = this.purchase.items.filter(x => x.id !== id_);
  }

  editItem(id_: number) {
    const item = this.getItemById(id_);
    if (item !== null) {
      const config: MatDialogConfig = {
        data: {item},
        maxWidth: '100%',
        width: '100%'
      };
      const editDialogRef = this.dialog.open(PurchaseItemEditDialogComponent, config);
      editDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.purchase.items = this.purchase.items.map(x =>
              x.id === id_ ? editDialogRef.componentInstance.purchaseItem : x);
        }
      });
    }

  }

  fillFormGroup(p_: Purchase) {
    this.purchaseForm = this.fb.group({
      name: [p_.name, [Validators.required]],
      itemName: [null],
      sharedForUsername: [p_.sharedForUsername]
    });
  }

  updateEntity() {
    this.purchase.name = this.purchaseForm.get('name').value;
    this.purchase.sharedForUsername = this.purchaseForm.get('sharedForUsername').value;
  }

  resolveService(purchase_: Purchase): Observable<any> {
    return this.mode === 'UPDATE' ? this.purchaseService.editPurchase(purchase_) :
        this.purchaseService.createPurchase(purchase_);
  }

  save() {
    this.updateEntity();
    this.resolveService(this.purchase).subscribe(() => {
      this.router.navigate(['/app/front/purchases/purchase-list']).then(() => {
      });
    });
  }

  cancel() {
    this.router.navigate(['/app/purchases/purchase-list']).then(() => {
    });
  }

  getItemById(id_: number): PurchaseItem {
    return this.purchase.items && this.purchase.items.length > 0 ?
        this.purchase.items.find(x => x.id === id_) : null;
  }

}
