import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.styl']
})
export class SidebarComponent implements OnInit {

  panels = [
    {
      active    : false,
      name      : '机构管理',
      childPanel: [
        {
          active: false,
          name  : '机构管理'
        }
      ]
    },
    {
      active: false,
      name  : '产品管理',
      childPanel: [
        {
          active: false,
          name  : '产品管理'
        }
      ]
    },
    {
      active: false,
      name  : '任务管理',
      childPanel: [
        {
          active: false,
          name  : '任务管理'
        }
      ]
    }
  ];

  openMap = {
    org: false,
    vendor: false,
    task: false
  };

  constructor() { }

  ngOnInit() {
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[ key ] = false;
      }
    }
  }

}
