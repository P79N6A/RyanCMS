import React, { ErrorInfo } from 'react';
import { message } from 'antd';
import 'reflect-metadata';
export function catchError(constructor: any) {
	const componentDidCatch = constructor.componentDidCatch;
	constructor.componentDidCatch = function(error: Error, errorInfo: ErrorInfo) {
		console.log(error, errorInfo);
	};
	return constructor;
}
