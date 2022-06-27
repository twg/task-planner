import { AfterViewInit, Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4ThemesAnimated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';
import { AppService } from '../app.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, AfterViewInit {
  taskData1: any;
  @Input()
  set taskData(taskData: any) {
    this.taskData1 = taskData;
    this.setChartData();
    this.drawPieChart();
    console.log('taskdata is showing', this.taskData1);

  }
  chartData: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private ngZone: NgZone, private appService: AppService) { }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        f();
      })
    }
  }

  ngOnInit(): void {
    this.setChartData();
    this.appService.getChartData().subscribe(tasks => {
      this.taskData1 = tasks;
      this.setChartData();
      this.drawPieChart();
    })
  }

  setChartData() {
    this.chartData = [
      { statusName: 'Open', statusCount: this.countStatus('open') },
      { statusName: 'Pending', statusCount: this.countStatus('pending') },
      { statusName: 'Completed', statusCount: this.countStatus('completed') },
      { statusName: 'Overdue', statusCount: this.countStatus('overdue') },
      { statusName: 'In Progress', statusCount: this.countStatus('inProgress') }
    ];
  }

  countStatus(status: string) {
    return this.taskData1.filter((task: any) => task.currentStatus === status).length || 0;
  }

  ngAfterViewInit(): void {
    this.drawPieChart();
  }

  drawPieChart() {
    this.browserOnly(() => {
      am4core.useTheme(am4ThemesAnimated);
      let pieChart = am4core.create('taskStatus', am4charts.PieChart);
      pieChart.data = this.chartData;
      let pieSeries = pieChart.series.push(new am4charts.PieSeries());
      pieSeries.colors.list = [
        am4core.color('#e8e8e8'),
        am4core.color('#ffa07a'),
        am4core.color('#006400'),
        am4core.color('#8b0000'),
        am4core.color('#daf7a6')
      ];
      pieSeries.dataFields.value = 'statusCount';
      pieSeries.dataFields.category = 'statusName';
      pieSeries.slices.template.stroke = am4core.color('#ffffff');
      pieSeries.labels.template.disabled = false;
      pieSeries.slices.template.strokeWidth = 0;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.startAngle = -90;
      pieSeries.hiddenState.properties.endAngle = -90;
    })
  }

}
