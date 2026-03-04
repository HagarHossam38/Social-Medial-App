import { Component, ElementRef, HostListener, inject, OnInit, PLATFORM_ID, ViewChild, viewChild } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { log } from 'node:console';
import { AuthService } from '../../../core/services/auth/auth.service';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { IUser } from '../../../core/models/User/iuser.interface';
import { UserService } from '../../../core/services/user/user.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  // constructor(private flowbiteService: FlowbiteService) { }

  // ngOnInit(): void {
  //   this.flowbiteService.loadFlowbite((flowbite) => {
  //     initFlowbite();
  //   });
  // }
  private readonly platformId = inject(PLATFORM_ID);
  loggedInUser!: IUser;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem("loggedUserData");
      if (storedUser) {
        this.loggedInUser = JSON.parse(storedUser);
      }
    }
  }
  profileMenuOpen: boolean = false
  openProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }
  @ViewChild('profileMenu') profileMenu!: ElementRef

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.profileMenu && !this.profileMenu.nativeElement.contains(event.target)) {
      this.profileMenuOpen = false;
    }
  }
  private readonly userService = inject(UserService);
  logout() {
    this.userService.signOut();
  }


}
