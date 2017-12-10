import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { scaleBand, ScaleBand, scaleLinear, ScaleLinear, scaleOrdinal, ScaleOrdinal, schemeCategory10 } from 'd3-scale';
import { Axis, axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { BaseType, Selection, window } from 'd3-selection';
import { SvgChart } from 'd3kit';
import { BarDatum } from '../types';

@Component({
  selector: 'bar-chart',
  template: '',
  styles: []
})
export class BarChartComponent extends SvgChart implements OnChanges {

  @Input('data') bcdata: BarDatum[];

  // define public properties
  public colors: ScaleOrdinal<string|number|Date, string>;

  // define private properties
  private xScale: ScaleBand<string|number|Date>;
  private yScale: ScaleLinear<number, number>;
  private xAxisG: Selection<BaseType, any, BaseType, any>;
  private yAxisG: Selection<BaseType, any, BaseType, any>;

  constructor(private el: ElementRef) {
    super(el.nativeElement);

    // define private properties
    this.xScale = scaleBand().range([0, this.getInnerWidth()]).padding(0.1);
    this.yScale = scaleLinear().range([this.getInnerHeight(), 0]);
    this.colors = scaleOrdinal(schemeCategory10);
    this.xAxisG = this.rootG.append('g');
    this.yAxisG = this.rootG.append('g');

    // add basic event listeners
    this.draw = this.draw.bind(this);
    this.on('resize.default', this.draw);
    this.on('data.default', this.draw);

    // setup autoresize
    this.fit(
      {
        mode: 'aspectRatio',
        ratio: 4/3,
        maxWidth: window(el.nativeElement).innerWidth * 0.95,
        maxHeight: window(el.nativeElement).innerWidth * 0.95 * 0.75,
      },
      true
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.data(changes['bcdata'].currentValue);
  }

  draw(): void {
    // don't do anything if we don't have data
    if (!this.hasData()) { return; }

    // get the data
    const data: BarDatum[] = this.data();

    // update x and y scales to match the data
    this.xScale.domain(data.map((d: BarDatum) => d.category))
        .range([0, this.getInnerWidth()]);
    this.yScale.domain([0, max(data, (d: BarDatum) => +d.value)])
        .range([this.getInnerHeight(), 0]);

    // create a set of bars
    const bars = this.rootG.selectAll('.bar').data(data);

    // (re)draw the bars (rectangles)
    const barEntry = bars.enter().append('rect')
        .attr('class', 'bar');

    bars.merge(barEntry)
        .attr('x', (d: BarDatum) => this.xScale(d.category))
        .attr('width', this.xScale.bandwidth())
        .attr('y', (d: BarDatum) => this.yScale(+d.value))
        .attr('height', (d: BarDatum) => this.getInnerHeight() - this.yScale(+d.value))
        .style('fill', (d: BarDatum) => this.colors(d.category));

    // remove the bars (to prepare for re-drawing the chart)
    bars.exit().remove();

    // (re)draw the x axis
    this.xAxisG
        .attr('transform', `translate(0, ${this.getInnerHeight()})`)
        .call(axisBottom(this.xScale));

    // (re)draw the y axis
    this.yAxisG.call(axisLeft(this.yScale));
  }
}
