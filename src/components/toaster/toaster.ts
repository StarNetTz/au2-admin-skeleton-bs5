import { Toast } from 'bootstrap'
import { IDisposable, IEventAggregator } from "aurelia";
import { IToast } from './IToast';

///ToDo: Implement multiple toasts stacking. Atm, it is 0last one wins'.
export class Toaster {
	static containerless = true;
	evSubscription: IDisposable;
	toasts: Array<IToast>;

	constructor(
		@IEventAggregator private EventAggregator: IEventAggregator
	) {
		this.toasts = [];
	}

	attached() {
		this.evSubscription = this.EventAggregator.subscribe("toast:publish", (tst: IToast, chn) => {
			this.toasts.push(tst);
			this.showToast(tst);
		});
	}

	private showToast(tst: IToast) {
		let toastElement = document.getElementById(`toast-${this.toasts.indexOf(tst)}`);
		let toast = new Toast(toastElement);
		toast.show();
		this.removeToast();
	}

	private removeToast() {
		setTimeout(() => {
			this.toasts.shift();
		}, 5000);
	}

	dispose() {
		this.evSubscription.dispose();
	}
}