import { platform } from 'os';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { NgxSpinnerModule } from "ngx-spinner";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  //protected readonly title = signal('Social-Medial-App');

  appReady: boolean = false;
  private readonly platformId = inject(PLATFORM_ID)
  ngOnInit(): void {
    //3shan myro7sh ll login w b3den yro7 ll home bsor3a (Login flash issue)
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('socialMediaToken')) {
        this.appReady = true;
      } else {
        this.appReady = true;
      }
    }
    //  initFlowbite();
  }
}
