import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Travel} from "../../../api/booking/models/travel";
import {TravelTicketDetailComponent} from "../travel-ticket-detail/travel-ticket-detail.component";
import {ConfirmDialogComponent} from "../../../shared/ui/confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {PaymentService} from "../../../api/payment/services/payment.service";

@Component({
  selector: 'app-travel-ticket-list',
  templateUrl: './travel-ticket-list.component.html',
  styleUrls: ['./travel-ticket-list.component.scss']
})
export class TravelTicketListComponent {

  waitingForRefund: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TravelTicketListComponent>,
    private router: Router,
    private paymentService: PaymentService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Travel[]) {
  }

  onClick(ticket: Travel): void {
    this.dialog.open(TravelTicketDetailComponent, {
      width: '300px',
      data: ticket
    });
  }

  // reitegrar factura
  onRefund(): void {
    this.waitingForRefund = true;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Advertencia',
        content: 'Está a punto de solicitar el reintegro de todos los boletines de esta factura. ¿Está seguro de que desea continuar?',
        cancelText: 'no',
        acceptText: 'si',
      }
    });
    dialogRef.afterClosed().subscribe(r => {
      if (r) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
        this.paymentService.requestRefundPayByInvoice(
          {body:{invoice: parseInt(this.data[0].invoiceId!), userId: currentUser.id}}).subscribe( resp => {

          console.log(resp);

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
      } else {
        this.waitingForRefund = false;
      }
    });
  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
