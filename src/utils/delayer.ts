
import { DI } from '@aurelia/kernel';

export interface IDelayer {
	delay(miliseconds:number):Promise<void> ;
}

export const IDelayer = DI.createInterface<IDelayer>('IDelayer');

export class Delayer implements IDelayer {
	delay(miliseconds: number) : Promise<void> {
		return new Promise(
			resolve => setTimeout(resolve, miliseconds)
		);
	}

}