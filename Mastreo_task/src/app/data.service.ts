import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://cbe.themaestro.in:8021'

  constructor(private http: HttpClient) {}

  getAllStationCount(token: string): Observable<any[]> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams({ token }).toString();
    return this.http.post<any[]>(`${this.apiUrl}/api_mcharge_v2/all_data_count`, body, { headers });
  }
  newStationPie(token: string): Observable<any> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams({ token }).toString();
    return this.http.post<any[]>(`${this.apiUrl}/api_mcharge_v2/new_station_piechart`, body, { headers });
  }
  newCustomerPie(token: string): Observable<any> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams({ token }).toString();
    return this.http.post<any[]>(`${this.apiUrl}/api_mcharge_v2/new_customer_piechart`, body, { headers });
  }
  stationDetaills(token: string): Observable<any> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams({ token }).toString();
    return this.http.post<any[]>(`${this.apiUrl}/api_mcharge_v2/station_count`, body, { headers });
  }
  unitChargeData(token: string): Observable<any> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams({ token }).toString();
    return this.http.post<any[]>(`${this.apiUrl}/api_mcharge_v2/charging__statics`, body, { headers });
  }
  chargesDetails(token: string): Observable<any> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams({ token }).toString();
    return this.http.post<any[]>(`${this.apiUrl}/api_mcharge_v2/nodes_count`, body, { headers });
  }
  GetParkingReport(token: string): Observable<any> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const body = new URLSearchParams({ token }).toString();
    return this.http.post<any[]>(`${this.apiUrl}/api_mcharge_v2/parking_history_report`, body, { headers });
  }
}
// api_mcharge_v2/station_count -- station count
// /api_mcharge_v2/charging_units_statics --unit charge
// api_mcharge_v2/nodes_count charger details
///api_mcharge_v2/parking_history_report
// /api_mcharge_v2/charger_usage_chart  GetParkingReport