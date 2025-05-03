export interface IExecution {
	code: string;
	language: string;
}

export interface IExecutionQueue {
	message: string;
	unique_id: string;
}

export interface IExecutedCode {
	code_result: string;
	execution_time?: number;
}
