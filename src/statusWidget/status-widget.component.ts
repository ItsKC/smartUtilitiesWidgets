import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatusWidgetService } from './status-widget.service'

@Component({
  selector: 'status-widget',
  templateUrl: './status-widget.html',
  styleUrls: ['../styles/bootstrap.min.css']
})
export class StatusWidget {
  @Input() config;
  subscription: Subscription;
  private devArr: { id: string, stat: string}[];
  private ratio: number[]= [0,0];
    
	constructor( private service: StatusWidgetService ) {
	  // Load last measurements on every creation of this object
	  console.log("Status Widget Geldi");
	  this.ratio = [0,0];
	  this.devArr = [];
	}
	
	ngOnInit(){
	// subscription starts here
		this.subscription = this.service.subjectObs.subscribe((stats) => {
			this.devArr = stats.arr;
			this.calculatePercentage();
		});
		this.service.loadDeviceInfo();
		this.service.loadDeviceInfoRealTime();		
	}
	
	// Calculate percentage of Device Active Status
	calculatePercentage(){
		this.ratio = [0,0];
		for (let i = 0; i<this.devArr.length; i++){
		if (this.devArr[i].stat == "AÇIK"){
			this.ratio[1]++;
			}
			else
			{
				this.ratio[0]++;
			}
		}
	}
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}