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
	private creditInfo: number;
	private subject: Subject<any> = new Subject<any>();
	public subjectObs = this.subject.asObservable();
	private measurementSubject: Subject<any> = new Subject<any>();
	public subjectMeasurementObs = this.measurementSubject.asObservable();
	
	constructor( private inventory: InventoryService, private realtime: Realtime, private operations: OperationService,
		private measurements: MeasurementService) 
    {
		this.deviceInfo = [];
		this.creditInfo = 0;
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
		this.fillCreditInfo(result[result.length-1]);
	}
	// Subscribe and Update Real Time Credit Measurement 
	async loadCreditInfoRealTime(source){
		const subscription = this.realtime.subscribe('/measurements/' + source, (data) => {
			if(data.data.data.hasOwnProperty('Kredi')){
				console.log("real time");
				this.fillCreditInfo(data.data.data);
			}	
			console.log(data);
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
	fillCreditInfo(data){
		this.creditInfo = (data.Kredi.bakiye.value);
		console.log(this.creditInfo);
		this.measurementSubject.next({credit: this.creditInfo});
	}
}