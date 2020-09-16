import { Injectable } from '@angular/core';
import { InventoryService, Realtime } from '@c8y/client';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MonthlyCountWidgetService{
	
	private filter: {
	  fragmentType: string;
	  dateTo: string;
	  dateFrom: string;
	  withTotalPages: boolean;
	  pageSize: number;
	};
	private deviceArr: any[][];
	private subject: Subject<any> = new Subject<any>();
	public subjectObs = this.subject.asObservable();
	
	constructor( private inventory: InventoryService, private realtime: Realtime ) 
    {
		this.filter = {
		  fragmentType: 'c8y_IsDevice',
		  // paging information will be a part of the response now
		  dateTo: '',
		  dateFrom: '',
		  withTotalPages: true,
		  pageSize: 100
		};
	}
	
	async loadDeviceRecords(){
		const { data, res } =  await this.inventory.list(this.filter);
		console.log(data);
	}

	async loadDeviceRecordRealTime(){
		const subscription = this.realtime.subscribe('/managedobjects/*', (data) => {
			if(data.data.data.hasOwnProperty('c8y_IsDevice')){
				this.updateDeviceStatus(data);
			}	
		})
	}
	
	updateDeviceStatus(data){
		// TODO
	}
	
	getDateFromUtc(){
		var dateInfo = this.getDateInfo();
	}
	getDateToUtc(){
		var dateInfo = this.getDateInfo();
	}
	getDateInfo(){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth();
		var day = today.getDate();
		return [ year, month, day];
	}
}