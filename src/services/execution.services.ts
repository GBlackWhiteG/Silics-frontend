import { axiosClassic } from '@/api/axios';

import type { IExecutedCode, IExecution, IExecutionQueue } from '@/types/execution.types';

class ExecutionServices {
	private _CODE = '/code';

	async sendCodeToQueue(data: IExecution) {
		return await axiosClassic.post<IExecutionQueue>(`${this._CODE}/execute`, data).then(res => {
			if (res.status === 200) {
				return this.getCodeFromQueue(res.data.unique_id);
			}
		});
	}

	private async getCodeFromQueue(id: string) {
		return await axiosClassic.get<{ result: IExecutedCode }>(
			`${this._CODE}/execution-result/${id}`,
		);
	}
}

export const executionService = new ExecutionServices();
