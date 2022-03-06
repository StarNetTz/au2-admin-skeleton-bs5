import { IDisposable, IEventAggregator } from 'aurelia';
import { observable } from '@aurelia/runtime-html';
import { I18N } from '@aurelia/i18n';
import * as Consts from '../common'


export class Filter {
	eaSubscription: IDisposable;
	isInitialized: boolean;
	isBusy: boolean;

	@observable qryString: string;


	constructor(
		@IEventAggregator private ea: IEventAggregator,
		@I18N private I18N: I18N
	) {
		this.isInitialized = false;
		this.isBusy = false;
		this.eaSubscription = this.ea.subscribe(Consts.CountriesLoadedEvent, () => {
			this.isBusy = false;
		});
		this.isInitialized = true;
	}

	qryStringChanged(n, o) {
		console.log(n);
		if (!this.isInitialized)
			return;
		this.publishFilterCommand()
	}


	publishFilterCommand() {
		this.isBusy = true;
		let qry = {
			name: "filterByName",
			startsWith: this.qryString,
			collection: "countries"
		}
		this.ea.publish(Consts.LoadCountriesCommand, qry);
	}

	dispose() {
		this.eaSubscription.dispose();
	}
}