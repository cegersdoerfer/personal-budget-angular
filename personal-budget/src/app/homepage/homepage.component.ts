import { Component, AfterViewInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit{



  constructor(private dataService: DataServiceService) { }

  ngAfterViewInit(): void {
    this.dataService.getData()
    .then((res: any) => {
      this.createChart(res);
      });


    fetch('../../assets/js/d3Plot.js')
    .then(res => res.text())
    .then(body => {
      var script = document.createElement('script');
      script.innerHTML = body;
      document.body.appendChild(script);
    });
    }

    createChart(dataSource: any) {
      var ctx = document.getElementById('myChart') as HTMLCanvasElement;
      var myPieChart = new Chart(ctx, {
          type: 'pie',
          data: dataSource
      });
    }



}
