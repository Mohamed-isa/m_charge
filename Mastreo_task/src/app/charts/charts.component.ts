import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Chart ,registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables,ChartDataLabels);
Chart.register();

interface StationData {
    month: string;
    Total: number;
}

interface pieData {
    label: string;
    value: number;
}
interface unitData {
    label: string;
    session:number;
    value: number;
}
export interface ApiResponse {
    status: number;
    msg: string;
    data: StationData[];
}
export interface ApiResponseforpie {
    status: number;
    msg: string;
    data: pieData[];
}
export interface ApiResponseforUnitpie {
    status: number;
    msg: string;
    data: unitData[];
}
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart: any;
  newStationPie!: StationData[];
    newCustomerBar!: { month: string; Total: number; }[];
    stationDetail!:any;
    stationPie: any;
    unitConsumed!: { label: string; value: number; }[];
    chargerDataArray!: { label: string; value: number; }[];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const getToken = window.sessionStorage.getItem('token');
    const token = getToken ? String(getToken) : '';
    this.fetchStationPie(token);
    this.fetchCustomerPie(token);
    this.stationDetails(token);
    this.unitConsume(token);
    this.chargerData(token);
  }

  fetchStationPie(token: string): void {
    this.dataService.newStationPie(token).subscribe({
        next: (response: ApiResponse) => {
            console.log(response);

            if (response && response.data && Array.isArray(response.data)) {
                this.newStationPie = response.data.map(({ month, Total }: StationData) => ({ month, Total }));

                console.log('Station pie:', this.newStationPie);
// Extract data for the chart
const chartLabels = this.newStationPie.map(
    (item: { month: any }) => item.month
  );
  const chartData = this.newStationPie.map(
    (item: { Total: any }) => item.Total
  );
  
  // Get chart canvas and context
  const linechartCanvas = document.getElementById('lineChart') as HTMLCanvasElement;
  const linechartCtx = linechartCanvas.getContext('2d');
  if (linechartCtx) {
    this.chart = new Chart(linechartCtx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'New Station',
            data: chartData,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgba(33, 161, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',

            labels: {
              font: {
                size: 8,
              },
              boxWidth: 15, 
              padding: 10, 
              usePointStyle: true,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'New Station',
            },
          },
        },
      },
    });
  }
  
} 
          
        },
        error: (err) => {
            console.error('Error fetching station count:', err);
        },
    });
}
fetchCustomerPie(token: string): void {
    this.dataService.newCustomerPie(token).subscribe({
        next: (response: ApiResponse) => {
            console.log(response);

            if (response && response.data && Array.isArray(response.data)) {
                this.newCustomerBar = response.data.map(({ month, Total }: StationData) => ({ month, Total }));

                console.log('Station pie:', this.newCustomerBar);
// Extract data for the chart
const chartLabels = this.newCustomerBar.map(
    (item: { month: any }) => item.month
  );
  const chartData = this.newCustomerBar.map(
    (item: { Total: any }) => item.Total
  );
  
  // Get chart canvas and context
  const linechartCanvas = document.getElementById('customerchart') as HTMLCanvasElement;
  const linechartCtx = linechartCanvas.getContext('2d');
  if (linechartCtx) {
    this.chart = new Chart(linechartCtx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'New Customer',
            data: chartData,
            
            backgroundColor: '#1E90FF',
            borderColor: '#1E90FF',
            borderWidth: 2  ,
          },
        ],
      },
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',

            labels: {
              font: {
                size: 8,
              },
              boxWidth: 15, 
              padding: 10, 
              usePointStyle: true,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'New Customer',
            },
          },
        },
      },
    });
  }
  
} 
           
        },
        error: (err) => {
            console.error('Error fetching station count:', err);
        },
    });
}
stationDetails(token: string): void {
    this.dataService.stationDetaills(token).subscribe({
        next: (response: ApiResponseforpie) => {
            console.log(response);

            if (response && response.data && Array.isArray(response.data)) {
                console.log(response.data);
                
                this.stationPie = response.data.map(({ label, value }: pieData) => ({ label, value }));

                console.log('Station pie chart:', this.stationPie);
// Extract data for the chart
const chartLabels = this.stationPie.map(
    (item: { label: any }) => item.label
  );
  const chartData = this.stationPie.map(
    (item: { value: any }) => item.value
  );
  
  // Get chart canvas and context
  const linechartCanvas = document.getElementById('stationchart') as HTMLCanvasElement;
  const linechartCtx = linechartCanvas.getContext('2d');
  if (linechartCtx) {
    // Create the chart
    this.stationDetail = new Chart(linechartCtx, {
        type: 'pie',
        data: {
          labels: chartLabels,
          datasets: [
            {
              data: chartData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(76, 194, 111, 0.8)',
              ],
              borderColor: [
                '#fff',
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
            position: 'bottom',

              labels: {
                font: {
                  size: 10,
                },
                boxWidth: 15, 
              padding: 10, 
              usePointStyle: true,
              },
            },
            datalabels: {
                color: '#ffffff',
                formatter: (value: number, context: any) => {
                  const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => {
                    return (a || 0) + (b || 0);
                  }, 0);
              
                  const percentage = total ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                  return percentage;
                },
              },
              
          },
        },
      });
      
  }
  
} 
        },
        error: (err) => {
            console.error('Error fetching station count:', err);
        },
    });
}

unitConsume(token: string): void {
    this.dataService.unitChargeData(token).subscribe({
        next: (response: ApiResponseforUnitpie) => {
            console.log(response);

            if (response && response.data && Array.isArray(response.data)) {
                console.log(response.data);
                
                this.unitConsumed = response.data.map(({ label, value }: unitData) => ({ label, value }));

                console.log('unit consume pie chart:', this.unitConsumed);
// Extract data for the chart
const chartLabels = this.unitConsumed.map(
    (item: { label: any }) => item.label
  );
  const chartData = this.unitConsumed.map(
    (item: { value: any }) => item.value
  );
  
  // Get chart canvas and context
  const linechartCanvas = document.getElementById('unitchart') as HTMLCanvasElement;
  const linechartCtx = linechartCanvas.getContext('2d');
  if (linechartCtx) {
    // Create the chart
    this.stationDetail = new Chart(linechartCtx, {
        type: 'pie',
        data: {
          labels: chartLabels,
          datasets: [
            {
              data: chartData,
              backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(76, 194, 111, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)'
                
              ],
              borderColor: [
                '#fff',
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
            position: 'bottom',

              labels: {
                font: {
                  size: 10,
                },
                boxWidth: 15, 
              padding: 10, 
              usePointStyle: true,
              },
            },
            datalabels: {
                color: '#ffffff',
                formatter: (value: number, context: any) => {
                  const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => {
                    return (a || 0) + (b || 0);
                  }, 0);
              
                  const percentage = total ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                  return percentage;
                },
              },
              
          },
        },
      });
      
  }
  
} 
        },
        error: (err) => {
            console.error('Error fetching station count:', err);
        },
    });
}
chargerData(token: string): void {
    this.dataService.chargesDetails(token).subscribe({
        next: (response: ApiResponseforpie) => {
            console.log(response);

            if (response && response.data && Array.isArray(response.data)) {
                console.log(response.data);
                
                this.chargerDataArray = response.data.map(({ label, value }: pieData) => ({ label, value }));

                console.log('unit consume pie chart:', this.chargerDataArray);
// Extract data for the chart
const chartLabels = this.chargerDataArray.map(
    (item: { label: any }) => item.label
  );
  const chartData = this.chargerDataArray.map(
    (item: { value: any }) => item.value
  );
  
  // Get chart canvas and context
  const linechartCanvas = document.getElementById('chargerchart') as HTMLCanvasElement;
  const linechartCtx = linechartCanvas.getContext('2d');
  if (linechartCtx) {
    // Create the chart
    this.stationDetail = new Chart(linechartCtx, {
        type: 'pie',
        data: {
          labels: chartLabels,
          datasets: [
            {
              data: chartData,
              backgroundColor: [
                'rgba(255, 159, 64, 0.8)',
                'rgba(76, 194, 111, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)'
              ],
              borderColor: [
                '#fff',
              ],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
            position: 'bottom',
              labels: {
                font: {
                  size: 10,
                },
                boxWidth: 15, 
              padding: 10, 
              usePointStyle: true,
              },
            },
            datalabels: {
                color: '#ffffff',
                formatter: (value: number, context: any) => {
                  const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => {
                    return (a || 0) + (b || 0);
                  }, 0);
              
                  const percentage = total ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                  return percentage;
                },
              },
              
          },
        },
      });
      
  }
  
} 
        },
        error: (err) => {
            console.error('Error fetching station count:', err);
        },
    });
}
}




