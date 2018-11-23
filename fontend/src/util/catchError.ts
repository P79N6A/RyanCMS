import { message } from 'antd';
export function catchError(catchFn?: Function) {
	if (typeof catchFn !== 'function') {
		catchFn = message.error;
	}
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const fun = descriptor.value;
		descriptor.value = function() {
			const self = this;
			const args = arguments;
			return (async function() {
				try {
					await fun.apply(self, args);
				} catch (error) {
					(catchFn as Function)(error.message);
				}
			})();
		};
	};
}
