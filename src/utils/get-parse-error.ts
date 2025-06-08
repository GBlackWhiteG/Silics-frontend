import type { AxiosError } from 'axios';

export const parseError = (err: AxiosError | any) => {
	let errorMessage;
	if (err?.response.data?.error) {
		errorMessage = err?.response.data?.error;
	} else if (err?.response.data) {
		errorMessage = JSON.parse(err?.response.data);
	} else {
		errorMessage = err?.message;
	}

	let message = '';
	if (errorMessage && typeof errorMessage === 'object') {
		for (const [key, value] of Object.entries(errorMessage)) {
			if (value instanceof Array) {
				message += `${key}: ${value[0]}\n`;
			} else {
				message += `${key}: ${value}\n`;
			}
		}
	} else {
		message = errorMessage;
	}

	return message;
};
