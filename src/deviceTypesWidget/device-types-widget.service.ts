import { Injectable } from '@angular/core';
import { InventoryService, Realtime } from '@c8y/client';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DeviceTypesWidgetService{
	
	private filter: {
	  fragmentType: string;
	  withTotalPages: boolean;
	  pageSize: number;
	};
	private subject: Subject<any> = new Subject<any>();
	public subjectObs = this.subject.asObservable();
	private deviceArr: { id: string, stat: string}[];
	
	constructor( private inventory: InventoryService, private realtime: Realtime ) 
    {
		console.log('service constructor');
		this.deviceArr = [];
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
		this.getDeviceStatus(data);
	}

	async loadDeviceInfoRealTime(){
		const subscription = this.realtime.subscribe('/managedobjects/*', (data) => {
			if(data.data.data.hasOwnProperty('c8y_IsDevice')){
				this.updateDeviceStatus(data);
			}	
		})
	}
	
	updateDeviceStatus(data){
		let index = this.deviceArr.findIndex(e => e.id == data.data.data.id);
		if (index >= 0){
			this.deviceArr[index].stat = data.data.data.ProtokolTipi;
		}
		else{
			this.deviceArr.push({id: data.data.data.id, stat: data.data.data.ProtokolTipi});
		}
		this.subject.next({arr: this.deviceArr});
		console.log(this.deviceArr);
	}
	
	getDeviceStatus(data){
		for (let i = 0; i<data.length; i++){
			this.deviceArr[i] = {id: data[i].id, stat: data[i].ProtokolTipi };
		}
		this.subject.next({arr: this.deviceArr});
	}
}