import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../order/order.component';
import { CommonModule } from '@angular/common';
import { Taco } from '../order/order.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [ CommonModule ],
  template: `
  <h1>Order Summary</h1>
  @if (order.tacos.length > 0) {
    <ul>
      @for (taco of order.tacos; track taco; let index = $index) {
        <li class="order-line-item">
          <div class="line-item-header">
            <div class="item-identifier">Line Item {{ index + 1 }}</div>
            <strong>{{ taco.quantity }}x {{ taco.name }}</strong>
          </div>
          <div class="line-item-details">
            <span class="price-label">Price per taco: {{ taco.price | currency:'USD':'symbol':'1.2-2' }}</span>
            <span class="quantity-qty">Qty: {{ taco.quantity }}</span>
            <span class="line-subtotal">Subtotal: {{ (taco.price * (taco.quantity ?? 1)) | currency:'USD':'symbol':'1.2-2' }}</span>
          </div>
          @if (taco.noOnions || taco.noCilantro) {
            <div class="customizations">
              <strong>Customizations:</strong>
              @if (taco.noOnions) {
                <span class="customization-tag">No onions</span>
              }
              @if (taco.noCilantro) {
                <span class="customization-tag">No cilantro</span>
              }
            </div>
          }
          <button class="remove-btn" (click)="removeTaco(taco)">Remove Taco</button>
        </li>
      }
    </ul>
    <p><strong>Total:</strong> {{ getTotal() | currency:'USD':'symbol':'1.2-2' }}</p>
  } @else {
    <p>No tacos added to the order yet.</p>
  }
  `,
  styles: `
    li.order-line-item {
      margin-bottom: 15px;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
    }

    .line-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .item-identifier {
      font-weight: 600;
      color: #666;
      font-size: 0.9em;
      margin-right: 10px;
    }

    .line-item-details {
      display: flex;
      gap: 15px;
      margin-bottom: 8px;
      font-size: 0.9em;
      flex-wrap: wrap;
    }

    .price-label {
      color: #555;
    }

    .quantity-qty {
      color: #666;
    }

    .line-subtotal {
      font-weight: 600;
      color: #333;
    }

    .customizations {
      margin: 8px 0;
      padding: 6px 0;
      font-size: 0.85em;
    }

    .customization-tag {
      display: inline-block;
      background-color: #e8f4f8;
      padding: 3px 8px;
      margin-right: 8px;
      border-radius: 3px;
      color: #0066cc;
    }

    .remove-btn {
      background-color: #ff6b6b;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 0.85em;
      margin-top: 8px;
    }

    .remove-btn:hover {
      background-color: #ff5252;
    }
  `
})
export class OrderSummaryComponent {
  @Input() order!: Order;
  @Output() tacoRemoved = new EventEmitter<Taco>();

  getTotal() {
    return this.order.tacos.reduce((acc, taco) => acc + (taco.price * (taco.quantity ?? 1)), 0);
  }

  removeTaco(taco: Taco) {
    this.tacoRemoved.emit(taco);
  }
}
