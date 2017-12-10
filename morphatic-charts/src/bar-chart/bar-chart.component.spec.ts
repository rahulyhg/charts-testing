import { Component, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BarChartComponent } from './bar-chart.component';
import { BarDatum } from '../types';

const data: BarDatum[] = [
  {
    category: 'fucks given',
    value: 0
  },
  {
    category: 'fucks not given',
    value: 10
  }
];

describe('BarChartComponent', () => {
  let barChart: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    barChart = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(barChart).toBeTruthy();
  });

  it('should create an <svg> element', () => {
    expect(barChart.svg).toBeTruthy();
  });

  it('should receive data', () => {
    expect(barChart.hasData()).toBe(false);
    barChart.data(data);
    expect(barChart.hasData()).toBe(true);
    expect(barChart.data()).toMatchObject(data);
    barChart.draw();
    fixture.detectChanges()
    let svg = fixture.debugElement.query(By.css('g'));
    expect(svg).toBeTruthy();
    console.log(barChart.chartRoot.html())
  });
});
