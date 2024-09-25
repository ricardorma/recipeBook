import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal-behaviour.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{

  isOpen: boolean = false;

  constructor(private authService: AuthService, private modalService: ModalService) {}
  
  ngOnInit(): void {
    this.modalService.modalStatus$.subscribe((status: boolean) => {
      this.isOpen = status;
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithGitHub() {
    this.authService.loginWithGitHub();
  }

  closeModal() {
    this.modalService.closeModal();  // Cierra el modal
  }
}
