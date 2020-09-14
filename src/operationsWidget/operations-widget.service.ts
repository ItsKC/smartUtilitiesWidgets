import { Injectable } from '@angular/core';
import { InventoryService, Realtime, OperationService, IOperation, MeasurementService } from '@c8y/client';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class OperationsWidgetService{
	
	private filter: {
	  fragmentType: string;
	  source: string;
	  withTotalPages: boolean;
	  pageSize: number;
	};
	private deviceInfo: string[];
	private subject: Subject<any> = new Subject<any>();
	public subjectObs = this.subject.asObservable();
	
	constructor( private inventory: InventoryService, private realtime: Realtime, private operations: OperationService,
		private measurements: MeasurementService) 
    {
		this.deviceInfo = [];
	}
	// Get Device Name and Valve Status
	async loadDeviceInfo(source){
		const { data, res } =  await this.inventory.detail(source);
		this.fillDeviceInfo(data);
	}
	
	// Subscribe and Update Real Time Valve Status and Device Name 
	async loadDeviceInfoRealTime(source){
		const subscription = this.realtime.subscribe('/managedobjects/' + source, (data) => {
			if(data.data.data.hasOwnProperty('c8y_IsDevice')){
				this.fillDeviceInfo(data.data.data);
			}	
		})
	}
	// Get Credit Info
	async loadCredit(id){
		this.filter = {
		  fragmentType: 'Kredi',
		  source: id,
		  // paging information will be a part of the response now
		  withTotalPages: true,
		  pageSize: 1000
		};
		const { data, res, paging } =  await this.measurements.list(this.filter);
		var result = data;
		var page = paging;
		for(let i = 1; i < page.totalPages; i++){
			const nextPage = await page.next();
			result = nextPage.data;
			page = nextPage.paging;
		}
		console.log(result);
	}
	// Subscribe and Update Real Time Credit Measurement 
	async loadCreditInfoRealTime(source){
		const subscription = this.realtime.subscribe('/measurements/' + source, (data) => {
			if(data.data.data.hasOwnProperty('Kredi')){
				// TODO
			}	
		})
	}
	// Create Load Credit Operation
	async createCreditOperation(deviceId, credit){
		const mandantoryObject: IOperation = {
         c8y_LoadCredit: {},
		 description: "Kredi Yükle",
		 credit: credit,
         deviceId: deviceId,
		};
		const { data, res } =  await this.operations.create(mandantoryObject);
	}
	// Create Open Valve Operation
	async createOpenValveOperation(deviceId){
		const mandantoryObject: IOperation = {
         c8y_OpenValve: {},
		 description: "Vana Aç",
         deviceId: deviceId,
		};
		const { data, res } =  await this.operations.create(mandantoryObject);
	}
	// Create Close Valve Operation
	async createCloseValveOperation(deviceId){
		const mandantoryObject: IOperation = {
         c8y_CloseValve: {},
		 description: "Vana Kapa",
         deviceId: deviceId,
		};
		const { data, res } =  await this.operations.create(mandantoryObject);
	}
	// Fill Device based on Api Results data
	fillDeviceInfo(data){
		this.deviceInfo[0] = data.name;
		this.deviceInfo[1] = data.VanaDurumu;
		this.subject.next({arr: this.deviceInfo});
	}
}