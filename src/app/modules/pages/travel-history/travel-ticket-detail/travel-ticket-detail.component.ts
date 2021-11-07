import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Travel} from "../../../api/booking/models/travel";
import {PaymentService} from "../../../api/payment/services/payment.service";
import {ConfirmDialogComponent} from "../../../shared/ui/confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-travel-ticket-detail',
  templateUrl: './travel-ticket-detail.component.html',
  styleUrls: ['./travel-ticket-detail.component.scss']
})
export class TravelTicketDetailComponent implements OnInit {

  transportation: string | undefined;
  waitingForRefund: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TravelTicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Travel) {}

  ngOnInit(): void {
    this.transportation = this.data.transport!.includes('Omnibus') ? 'Ómnibus' : (this.data.transport!.includes('Ferro') ? 'Tren' : 'Catamarán');
  }

  // solicitar reintegro
  onRefund(): void {
    this.waitingForRefund = true;
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    this.paymentService.requestRefundPayByTiket(
      {body: {serialNumber: this.data.serialNumber , userId:currentUser.id}}).subscribe(resp => {

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: 'Solicitud realizada',
          content: resp.message,
          acceptText: 'ok',
        }
      });
      dialogRef.afterClosed().subscribe(r => {
        if (r) {
          this.dialog.closeAll();
          this.reloadCurrentRoute();
        }
      });
    }, () => {
      this.waitingForRefund = false;
    });
  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
