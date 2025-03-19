import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Constant } from './core/constant/Constant';
import { ConstReadPipe } from './shared/pipes/const-read.pipe';
import { OrderApprovalStage, OrderStatus } from './core/enum/Enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  orderObj: any  = {
    status: ''
  }

  constructor() {
      this.orderObj.status = OrderApprovalStage.New;
  }
}
