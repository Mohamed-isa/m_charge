import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';

export interface ApiResponseforReport {
  status: number;
  msg: string;
  data: {
    items: Item[];
  };
}

export interface Item {
  customer_id: number;
  customer_name: string;
  station_id: number;
  station_name: string;
  duration: string;
  start_datetime: string;
  end_datetime: string;
  parking_type: number;
  parking_type_name: string;
  booking_status: number;
  booking_status_name: string;
  total_amount: number;
  created_at: string;
}

@Component({
  selector: 'app-parking-report',
  templateUrl: './parking-report.component.html',
  styleUrls: ['./parking-report.component.css']
})
export class ParkingReportComponent implements OnInit {
  Reports: Item[] = [];
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  nodatafound: boolean = false;
  displayedColumns: string[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const getToken = window.sessionStorage.getItem('token');
    const token = getToken ? String(getToken) : '';
    this.getReport(token);
  }

  getReport(token: string) {
    this.dataService.GetParkingReport(token).subscribe({
      next: (response: ApiResponseforReport) => {
        console.log(response);

        if (response && response.data && Array.isArray(response.data.items)) {
          this.Reports = response.data.items;
          console.log('Station pie:', this.Reports);
        }

          this.displayedColumns = ['s.no', 'customer_name', 'station_name', 'booking_status_name', 'duration', 'parking_type_name', 'total_amount'];
          this.dataSource = new MatTableDataSource(this.Reports);
          this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.nodatafound = this.dataSource.data.length === 0;
      }
    });
  }
  exportToExcel(): void {
    // Prepare the data
    const data = this.Reports.map((report, index) => ({
      's.no': index + 1,
      'customer_name': report.customer_name,
      'station_name': report.station_name,
      'booking_status_name': report.booking_status_name,
      'duration': report.duration,
      'parking_type_name': report.parking_type_name,
      'total_amount': report.total_amount
    }));

    // Create a new workbook and worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');

    // Export the workbook
    XLSX.writeFile(workbook, 'Reports.xlsx');
  }
}
