import { Component, OnInit } from '@angular/core';
import {Travel} from "../../api/booking/models/travel";
import {HeaderService} from "../../shared/ui/header/header.service";
import {ResService} from "../../api/booking/services/res.service";
import {User} from "../../api/auth/models/user";

@Component({
  selector: 'app-travel-history',
  templateUrl: './travel-history.page.html',
  styleUrls: ['./travel-history.page.scss']
})
export class TravelHistoryPage implements OnInit {

  travelHistory: Travel[] | undefined;
  filteredTravels: Travel[] | undefined;
  groupedByBills: Array<Array<Travel>> | undefined;

  selected: string | undefined;

  constructor(private headerService: HeaderService,
              private resService: ResService) {
    headerService.setTitle('Mis Reservas');
  }

  ngOnInit(): void {
    this.selected = 'Próximas';

    const currentUser: User = JSON.parse(sessionStorage.getItem('currentUser')!);

    this.resService.travels({userId: currentUser.id}).subscribe(
      (travelHistory => {
        this.travelHistory = travelHistory;
        this.filterData('Próximas');
      }));
  }

  onSelection(selected: string): void {
    this.selected = selected;
    this.filterData(selected);
  }

  private filterData(filterValue: string): void {
    if (filterValue === 'Próximas') {
      this.filteredTravels = this.travelHistory!
        .filter(travel => travel.state === 'Vendido' && new Date(travel.outputDate!.replace(" ", "T")).getTime() > new Date().getTime());
      this.groupedByBills = this.groupByBill(this.filteredTravels, 'invoiceId');
    } else if (filterValue === 'Realizadas') {
      this.filteredTravels = this.travelHistory!
        .filter(travel => travel.state === 'Confirmado' ||
          (travel.state === 'Vendido' && new Date(travel.outputDate!.replace(" ", "T")).getTime() <= new Date().getTime()));
      this.groupedByBills = this.groupByBill(this.filteredTravels, 'invoiceId');
    } else if (filterValue === 'Canceladas') {
      this.filteredTravels = this.travelHistory!
        .filter(travel => (travel.state !== 'Vendido' && travel.state !== 'Confirmado')).reverse();
      this.groupedByBills = this.groupByBill(this.filteredTravels, 'invoiceId');
    }
  }

  private groupByBill(xs: Array<any>, key: string): Array<Array<Travel>> {
    const obj = xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

    return Object.values(obj);
  }
}
