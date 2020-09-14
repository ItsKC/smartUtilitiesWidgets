import { Injectable } from '@angular/core';
import { InventoryService, Realtime } from '@c8y/client';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ActiveStatusWidgetService{
	
	private filter: {
	  fragmentType: string;
	  withTotalPages: boolean;
	  pageSize: number;
	};
	private deviceArr: { id: string, stat: string}[];
	private subject: Subject<any> = new Subject<any>();
	public subjectObs = this.subject.asObservable();
	
	constructor( private inventory: InventoryService, private realtime: Realtime ) 
    {
		this.deviceArr = [];
		console.log('service constructor');
		this.filter = {
		  fragmentType: 'c8y_IsDevice',
		  // paging information will be a part of the response now
		  withTotalPages: true,
		  pageSize: 100
		};
	}
	
	async loadDeviceInfo(){
		const { data, res } =  await this.inventory.list(this.filter);
		console.log(data);
		this.getDeviceStatuses(data);
	}

	async loadDeviceInfoRealTime(){
		const subscription = this.realtime.subscribe('/managedobjects/*', (data) => {
			if(data.data.data.hasOwnProperty('c8y_IsDevice')){
				//console.log("Cihaz Bu");
				this.updateDeviceStatus(data);
			}	
		})
	}
	// Update deviceArr after change in one device
	updateDeviceStatus(data){
		let index = this.deviceArr.findIndex(e => e.id == data.data.data.id);
		if (index >= 0){
			this.deviceArr[index].stat = data.data.data.AktifDurumu;
		}
		else{
			this.deviceArr.push({id: data.data.data.id, stat: data.data.data.AktifDurumu});
		}
		this.subject.next({arr: this.deviceArr});
		console.log(this.deviceArr);
	}
	// Form deviceArr 
	getDeviceStatuses(data){
		for (let i = 0; i<data.length; i++){
			this.deviceArr[i] = {id: data[i].id, stat: data[i].AktifDurumu };
		}
		this.subject.next({arr: this.deviceArr});
	}
}