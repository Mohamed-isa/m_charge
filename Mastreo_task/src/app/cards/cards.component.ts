import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  stationCount!: any;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    let getToken = window.sessionStorage.getItem('token')
    const token = String(getToken); 
    this.fetchStationCount(token);
  }
  fetchStationCount(token: string): void {
    this.dataService.getAllStationCount(token).subscribe({
      next: (response) => {
        console.log(response);
        
        this.stationCount =response;
        console.log('Station Count:', this.stationCount);
      },
      error: (err) => {
        console.error('Error fetching station count:', err);
      },
    });
  }
}
