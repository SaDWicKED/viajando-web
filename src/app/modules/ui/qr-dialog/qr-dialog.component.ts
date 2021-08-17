import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Qrdata} from "../../shared/models/qrdata";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.scss']
})
export class QrDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Qrdata,
              private sanitizer: DomSanitizer) {
  }

  getTMData() {
    const id = this.data.id;
    const amount = this.data.amount;
    return `{"id_transaccion":"${id}",` +
      `"importe":${amount},` +
      '"moneda":"CUP",' +
      '"numero_proveedor":37000,' +
      '"version": "11200301"' +
      '}';
  }

  getTMUrl() {
    const id = this.data.id;
    const amount = this.data.amount;
    return this
      .sanitize(`transfermovil://tm_compra_en_linea/action?id_transaccion=${id}&importe=${amount}&moneda=CUP&numero_proveedor=30063`);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
