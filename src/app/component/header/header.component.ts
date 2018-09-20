import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import {LoginService} from '../../core/service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  public path: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private service: LoginService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.path = this.location.path();
  }
  
  out(): void {
    const userid = this.localStorageService.get('rootUserId');
    this.service.out('', '?userid=' + userid).subscribe(resp => {
      if (resp.code === 10200) {
        this.localStorageService.clearAll();
        this.router.navigateByUrl('/login');
      }
    });
  }

}
