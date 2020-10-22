import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { Subscription } from 'rxjs';
import { OperationsWidgetService } from './operations-widget.service'
import { Router } from '@angular/router';
import { AlertService } from '@c8y/ngx-components';

@Component({
  selector: 'operations-widget',
  templateUrl: './operations-widget.html',
  styleUrls: ['../styles/bootstrap.min.css', './operations-widget.css']
})
export class OperationsWidget {
  @Input() config;
  subscription: Subscription;
  subscriptionCredit: Subscription;
  private href: string;
  private source: string;
  private operationList: any[];
  private selectedStatus: {
	  id: number;
	  name: string;
  };
  private appliedStatus: {};
  private devArr: string[];
  private devCredit: number;
  private isHidden: boolean;
  private creditValue: string;
  
    constructor( private service: OperationsWidgetService, private router: Router, private alert: AlertService) {
	  // Load last measurements on every creation of this object
		this.operationList = [{
			id: 1,
			name: "Vana Aç"
		},{
			id: 2,
			name: "Vana Kapa"
		},{
			id: 3,
			name: "Kredi Yükle"
		}];
		this.selectedStatus = this.operationList[0];
	    this.appliedStatus = this.operationList[0];
	    this.href = this.router.url;
		this.isHidden = true;
		this.source = "";
		this.devArr = [];
		this.devCredit = 0;
		this.creditValue = "";
	}

	ngOnInit(){
		this.getDeviceIdFromUrl(this.href);
		this.subscription = this.service.subjectObs.subscribe((stats) => {
			this.devArr = stats.arr;
		});
		this.subscriptionCredit = this.service.subjectMeasurementObs.subscribe((stats) => {
			this.devCredit = stats.credit;
		});
		this.service.loadDeviceInfo(this.source);
		this.service.loadDeviceInfoRealTime(this.source);
		this.service.loadCredit(this.source);
		this.service.loadCreditInfoRealTime(this.source);
	}
	
	sendOperation(){
		if (this.selectedStatus.id == 1){
			this.service.createOpenValveOperation(this.source);
		}
		else if(this.selectedStatus.id == 2){
			this.service.createCloseValveOperation(this.source);
		}
		else{
			this.service.createCreditOperation(this.source,parseInt(this.creditValue));
		}
	}
	
	getDeviceIdFromUrl(href){
		var startIndex = href.indexOf('device');
		startIndex += 7;
		href = href.substring(startIndex);
		var endIndex = href.indexOf('/');
		href = href.substring(0,endIndex)
		this.source = href;
	}
	
	onChange(operation){
		if(operation == "Kredi Yükle"){
			this.isHidden = false;
		}
		else{
			this.isHidden = true;
		}
	}
	// Unsubscribe on destroy
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}