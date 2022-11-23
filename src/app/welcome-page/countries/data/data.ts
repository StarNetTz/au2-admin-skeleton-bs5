import { TOASTER_PUBLISH_EA_CHANNEL, ToastType } from '@starnetbih/au2-toaster';
import { IApiEndpoints, IRest } from "@starnetbih/au2-api";
import { IDisposable, IEventAggregator } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import * as Consts from '../common'
import { observable } from "@aurelia/runtime";

export class Data {
	api: IRest;

	query: any;

	model: any;
	isBusy: boolean;

	pageSize: number;
	@observable currentPageIdx: number;
	totalItems: number;
	showPagination: boolean;

	eaSubscription: IDisposable;

	constructor(
		@IApiEndpoints private Reg: IApiEndpoints,
		@IEventAggregator private ea: IEventAggregator,
		@I18N private I18N: I18N
	) {
		this.pageSize = 5;
		this.api = this.Reg.get('lookupsApi');
		this.eaSubscription = this.ea.subscribe(Consts.LoadCountriesCommandChannel, async qry => {
			console.log('recieved');
			this.query = qry;
			this.currentPageIdx = 0;
			await this.loadData();
		});
	}

	async loadData() {
		this.isBusy = true;
		const req = {
			currentPage: this.currentPageIdx,
			pageSize: this.pageSize,
			qry: this.query
		};

		try {
			this.model = await this.api.post({ resource: '/typeaheads', body: req });
			this.updatePaginator(this.model);
		}
		catch (e) {
			this.ea.publish(TOASTER_PUBLISH_EA_CHANNEL, { type: ToastType.ERROR, title: "Failed to fetch data", message: e });
		}
		finally {
			this.ea.publish(Consts.CountriesLoadedEventChannel);
			this.isBusy = false;
		}
	}

	updatePaginator(model) {
		this.totalItems = model.totalItems;
		this.currentPageIdx = model.currentPage;
		this.showPagination = model.totalItems > this.pageSize;
	}

	currentPageIdxChanged(n, o) {
		this.loadData();
	}

	dispose() {
		this.eaSubscription.dispose();
	}

}