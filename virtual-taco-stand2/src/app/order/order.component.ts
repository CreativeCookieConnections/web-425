export interface Taco {
  id: number;
  name: string;
  price: number;
  noOnions?: boolean;
  noCilantro?: boolean;
  quantity?: number;
}

export interface Order {
  tacos: Taco[];
  orderId: number;
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from "../order-summary/order-summary.component";

@Component({
    selector: 'app-order',
    standalone: true,
    template: `
    <div class="order-form-container">
      <form class="order-form" #tacoOrderForm="ngForm" (ngSubmit)="addToOrder();">
        <h1>Complete the form below to place a new order.</h1>

        <fieldset>
          <legend>My Order</legend>
          <label for="tacoType">Taco Type</label>
          <select name="tacoType" id="tacoType" [(ngModel)]="selectedTacoId" ngModel>
            @for (taco of tacos; track taco) {
              <option value="{{ taco.id }}">{{ taco.name }}</option>
            }
          </select>

          <label for="qty">Quantity</label>
          <input type="text" id="qty" name="qty" class="qty-input" [(ngModel)]="quantity" ngModel>

          <div class="customization-section">
            <label>Customize</label>

            <div class="customization-option">
              <input type="checkbox" id="noOnions" name="noOnions" [(ngModel)]="noOnions" ngModel>
              <label for="noOnions">No Onions</label>
            </div>

            <div class="customization-option">
              <input type="checkbox" id="noCilantro" name="noCilantro" [(ngModel)]="noCilantro" ngModel>
              <label for="noCilantro">No Cilantro</label>
            </div>
          </div>

          <input type="submit" value="Add to Order" />
        </fieldset>
      </form>

      <div class="order-summary">
        <app-order-summary [order]="order" (tacoRemoved)="onTacoRemoved($event)"></app-order-summary>
      </div>
    </div>
  `,
    styles: [`
    .order-form-container {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    .order-form {
      flex: 1;
      margin-right: 20px;
    }

    .order-summary {
      flex: 1;
    }

    fieldset {
      margin-bottom: 20px;
    }

    label, select, qty-input {
      display: block;
      margin-bottom: 5px;
    }

    .qty-input, select, input[type="submit"] {
      padding: 8px;
      box-sizing: border-box;
    }

    select {
      width: 100%;
    }

    .qty-input {
      width: 20%;
    }

    input[type="submit"] {
      float: right;
    }

    .customization-section {
      margin-top: 10px;
    }

    .customization-option {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
    }

    input[type="checkbox"] {
      margin-right: 5px;
    }
    /*
    // Removed this from the original styling
    .order-summary li {
      margin-bottom: 10px;
      padding: 5px;
    }
    */
  `
    ],
    imports: [FormsModule, CommonModule, OrderSummaryComponent]
})
export class OrderComponent {
  tacos: Taco[];
  order: Order;
  selectedTacoId: number;
  quantity: number;
  noOnions: boolean = false;
  noCilantro: boolean = false;
  orderTotal: number;

  @Output() orderUpdated = new EventEmitter<Order>();

  constructor() {
    this.tacos = [
      {id: 1, name: "Carnitas Taco", price: 3.25},
      {id: 2, name: "Queso Birria Taco", price: 3.50},
      {id: 3, name: "Al Pastor Taco", price: 3.25},
      {id: 4, name: "Tacos de Lengua", price: 3.50},
      {id: 5, name: "Chicken Taco", price: 3.25},
      {id: 6, name: "Fish Taco", price: 3.25},
      {id: 7, name: "Veggie Taco", price: 3.25},
      {id: 8, name: "Chicharron Taco", price: 3.25},
      {id: 9, name: "Potato Taco", price: 3.25},
      {id: 10, name: "Chorizo Taco", price: 3.25}
    ];

    this.order = { tacos: [], orderId: 0 };
    this.selectedTacoId = this.tacos[0].id;
    this.quantity = 1;
    this.orderTotal = 0;
  }

  addToOrder() {
    const selectedTacoNum = Number(this.selectedTacoId);

    const selectedTaco = this.tacos.find(taco => taco.id === selectedTacoNum);

    // random number between 1 and 1000 for order Id no decimal places
    this.order.orderId = Math.floor(Math.random() * 1000) + 1;

    if (selectedTaco !== undefined) {
      const tacoToAdd = {
        id: selectedTaco.id,
        name: selectedTaco.name,
        price: selectedTaco.price,
        noOnions: this.noOnions,
        noCilantro: this.noCilantro,
        quantity: this.quantity
      }

      this.order.tacos.push(tacoToAdd);
      console.log('Order after adding:', this.order);

      this.orderUpdated.emit(this.order);

      this.resetForm();
    } else {
      console.error('Taco not found in the list of available tacos.', this.selectedTacoId)
    }
  }

  resetForm () {
    if (this.tacos.length > 0) {
      this.selectedTacoId = this.tacos[0].id;
    }

    this.quantity = 1;
    this.noOnions = false;
    this.noCilantro = false;
  }

  /* This method is called when a taco is removed from the order summary. It finds the taco in the order's tacos array and removes it, then emits the updated order to the parent component. The findIndex method is used to locate the taco based on its properties, ensuring that the correct taco is removed even if there are multiple tacos with the same name or price. After removing the taco, we create a new order object to trigger change detection in Angular, which will update the order summary component accordingly. Finally, we emit the updated order so that any parent components can react to the change. */

  onTacoRemoved(taco: Taco) {
    const index = this.order.tacos.findIndex(t => 
      t.id === taco.id && 
      t.name === taco.name && 
      t.price === taco.price &&
      t.noOnions === taco.noOnions &&
      t.noCilantro === taco.noCilantro
    );

    // If the taco is found in the order, remove it and emit the updated order
    if (index > -1) {
      this.order.tacos.splice(index, 1);
      this.order = { ...this.order };
      this.orderUpdated.emit(this.order);
    }
  }
}
