import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
showFilter:boolean = false;
selectedYear: number | null = null; 
  years: number[] = [];
  constructor() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);
    this.selectedYear = currentYear;
   }

  ngOnInit(): void {
  }
  filter(){
    this.showFilter = !this.showFilter;
  }
}
