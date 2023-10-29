import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertComponent } from '../shared/alert/alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService, private modalService: NgbModal) {}

  showSuccess(message: string, title?: string) {
    this.openAlert(message, 'success');
  }

  showInfo(message: string, title?: string) {
    this.openAlert(message, 'info');
  }

  showWarning(message: string, title?: string) {
    this.toastr.warning(message, 'warning');
  }

  showError(message: string, title?: string) {
    this.toastr.error(message, 'error');
  }

  private openAlert(message: string, type: string) {
    const modalRef = this.modalService.open(AlertComponent, { centered: true });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.type = type;

    setTimeout(() => {
      modalRef.close();
    }, 3000);
  }

}
