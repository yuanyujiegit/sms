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
  
  out() {
    this.service.out('', '?userid=').subscribe((res) => {
      if (res.code === 10200) {
        this.localStorageService.clearAll();
        this.router.navigateByUrl('/login');
      }
    });
  }

}
