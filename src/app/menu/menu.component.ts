import {Component, OnInit} from '@angular/core';
import {StationCreateComponent} from '../stations/station-create/station-create.component';
import {SituationStationCreateComponent} from '../situation_stations/situation-station-create/situation-station-create.component';
import {User} from '../controller/model/user';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../controller/service/authentication.service';
import {UserService} from '../controller/service/user.service';
import {NotificationService} from '../controller/service/notification.service';
import {Role} from '../enum/role.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // @ts-ignore
  public user: User;
  private titleSubject = new BehaviorSubject<string>('Users');


  constructor(private router: Router, private authenticationService: AuthenticationService,
              private userService: UserService, private notificationService: NotificationService) {
  }

  public isCollapsed = true;

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }

  reloadCurrentPage(): void {
    window.location.reload();
  }

  public changeTitle(title: string): void {
    this.titleSubject.next(title);
  }



  public get isAdmin(): boolean {
    return this.getUserRole() === Role.SUPER_ADMIN;
  }

  public get isUser(): boolean {
    return this.getUserRole() === Role.USER || this.getUserRole() === Role.USER;
  }

  public get isOperatorBarrage(): boolean {
    return this.getUserRole() === Role.OPERATOR_BARRAGE;
  }

  public get isOperatorBac(): boolean {
    return this.getUserRole() === Role.OPERATOR_BAC;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }
}
