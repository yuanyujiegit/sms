import { Component, OnInit } from '@angular/core';
import { OrgService } from '../../core/service/org.service';
import { OrgInterface } from '../../core/interface/orgInterface';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.styl'],
  providers: [OrgService]
})
export class OrgComponent implements OnInit {
  
  params: any = {};
  orgList: Array<OrgInterface>;                  // table data
  total: number;                                // table 总数
  loading: boolean;                             // table loading

  constructor(
    private service: OrgService
  ) { }

  ngOnInit() {
    this.params = {
      orgname: '',
      pageFrom: 1,
      pageSize: 5
    };
    this.orgList = [];
    this.loading = false;
    this.getOrgList();
  }

  /**
   * 获取机构数据
   * @params: orgname
   * */
  getOrgList() {
    this.loading = true;
    this.service.getOrgList(this.params).subscribe(res => {
      this.loading = false;
      if (res.code === 10200) {
        this.orgList = res.data;
        this.total = res.total;
      } else {
        this.orgList = [];
        this.total = 0;
      }
    });
  }
  
  /**
   * 删除机构（其实就是修改机构接口）
   * */
  
  
}
