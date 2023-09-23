import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public dataSource: any = {
    datasets: [
        {
            data: [],
            backgroundColor: []
        }
    ],
    labels: []
};

  constructor(private http: HttpClient) { }

  async getData(): Promise<any>{
    if (this.dataSource.datasets[0].data.length > 0) {
      return this.dataSource;
    }
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/budget')
      .subscribe((res: any) => {
        console.log("res: ", res);
        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
          this.dataSource.datasets[0].backgroundColor[i] = res.myBudget[i].color;
        }
        resolve(this.dataSource);
      }, (err: any) => {
        reject(err);
      });
    });
  };
}
