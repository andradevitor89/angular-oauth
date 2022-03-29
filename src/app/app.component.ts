import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authCodeFlowConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private oAuthService: OAuthService, private router: Router) {
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }
  title = 'oauth-app';
  login() {
    this.oAuthService.initImplicitFlow();
  }
  logout() {
    this.oAuthService.logOut();
  }
  goToHomePage() {
    this.router.navigateByUrl('/home');
  }
  async printUserInfo() {
    console.log('hasValidAccessToken', this.oAuthService.hasValidAccessToken());
  }
  get token() {
    return this.oAuthService.getIdentityClaims();
  }
}
