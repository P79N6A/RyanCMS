import { message } from 'antd';
import { isMounted } from '../isMounted';
export function loading() {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const fun = descriptor.value;
		descriptor.value = function(this: any) {
			const args = arguments;
			const self = this;
			return (async function() {
				self.setState({
					loading: true
				});
				await fun.apply(self, args);
				if (isMounted(self)) {
					self.setState({
						loading: false
					});
				}
			})();
		};
	};
}
