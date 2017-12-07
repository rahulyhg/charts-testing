import { Component } from '@angular/core';
import { BarDatum } from '@morphatic/charts';
import * as Faker from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Morphatic Charts Testing App';
  barData: BarDatum[];

  constructor() {
    this.barData = this.generateBarData();
  }

  generateBarData(): BarDatum[] {
    let data: BarDatum[] = [];
    for (let i = 0; i < Math.floor(Math.random() * 6) + 4; i += 1) {
      data.push({
        category: Faker.fake("{{name.firstName}}"),
        value: Math.floor(Math.random() * 50)
      });
    }
    return data;
  }
}
