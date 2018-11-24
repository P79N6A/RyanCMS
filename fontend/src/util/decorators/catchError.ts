import { message } from 'antd';
export function catchError(catchFn?: Function | string) {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const fun = descriptor.value;
		descriptor.value = function() {
			const self = this;
			const args = arguments;
			return (async function() {
				try {
					await fun.apply(self, args);
				} catch (error) {
					errorHandle.apply(self, [ error, catchFn ]);
				}
			})();
		};
	};
}
export function errorHandle(this: any, error: Error, catchFn: Function) {
	if (catchFn) {
		catchFn.apply(this, [ error.message ]);
	}
	message.error(error.message);
}
