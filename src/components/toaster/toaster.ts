import { IDelayer } from "../../utils/delayer";
import { Toast } from 'bootstrap'
import { IDisposable, IEventAggregator } from "aurelia";

///ToDo: implement multiple toasts stacking. It is last one wins atm.
export class Toaster {
	static containerless = true;

	title: string;
	message: string;
	toast: Toast;
	evSubscription : IDisposable;
	imageSrc:string;

	constructor(
		@IDelayer private Delayer: IDelayer,
		@IEventAggregator private EventAggregator : IEventAggregator
	) {
		this.EventAggregator.subscribe("toast:publish", (tst:any, chn) => {
			this.message = tst.message;
			this.title = tst.title;
			this.imageSrc = `assets/img/${tst.type}.svg`;
			this.toast.show();
		});

	}

	async attached() {
		let toasts = Array.from(document.querySelectorAll('.toast'));
		let tn = toasts[0];
		this.toast = new Toast(tn);
	}

	dispose()
	{
		this.evSubscription.dispose();
	}
}