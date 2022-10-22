import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

type collection = 'users' | `users/${string}` | 'auth';

const HttpMethods = {
	GET: 'get',
	POST: 'post',
	PATCH: 'patch',
	DELETE: 'delete',
} as const;

const HttpErrorStatus = {
	UNKNOWN: 0,

	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	CONFLICT: 409,

	SERVER_ERROR: 500,
} as const;

export const HttpStatus = {
	...HttpErrorStatus,

	OK: 200,
	CREATED: 201,
} as const;

type HttpStatusType = typeof HttpStatus[keyof typeof HttpStatus];
type HttpErrorStatusType = typeof HttpErrorStatus[keyof typeof HttpErrorStatus];
type HttpMethodsType = typeof HttpMethods[keyof typeof HttpMethods];

export interface FetchConfig {
	apiUrl?: string;
	acessToken?: string;
}

class FetchQuery<T> {
	client: AxiosInstance;
	resource: collection;
	method: HttpMethodsType;
	config?: AxiosRequestConfig;
	payload?: Record<string, any>;

	errorHandlers: {
		[status in HttpStatusType]?: (data: AxiosResponse) => void;
	};

	successHandler?: (data: T) => void;

	constructor(
		action: AxiosInstance,
		method: HttpMethodsType,
		resource: collection,
		payload?: Record<string, any>,
		config?: AxiosRequestConfig
	) {
		this.client = action;
		this.resource = resource;
		this.config = config;
		this.method = method;
		this.payload = payload;

		this.errorHandlers = {};
	}

	addErrorHandler(status: HttpErrorStatusType, handler: (payload: AxiosResponse) => void): void {
		this.errorHandlers[status] = handler;
	}

	addSuccessHandler(handler: (payload: T) => void): void {
		this.successHandler = handler;
	}

	async resolve(): Promise<void> {
		try {
			const response = await this.client[this.method](
				this.resource,
				this.payload,
				this.config
			);

			const handler = this.successHandler ?? console.log;

			handler(response.data);
		} catch (error) {
			if (!axios.isAxiosError(error)) throw error;

			const parsedError: AxiosError = error;

			if (parsedError.response === undefined) {
				const handler = this.errorHandlers[HttpStatus.UNKNOWN] ?? console.error;
				return handler(parsedError);
			}

			const handler =
				this.errorHandlers[
					parsedError.response.status as keyof typeof this.errorHandlers
				] ?? console.error;

			handler(parsedError.response);
		}
	}
}

export class FetchClient<T> {
	client: AxiosInstance;
	API: string;
	acessToken?: string;

	constructor(config?: FetchConfig) {
		config ??= {};

		this.API = config.acessToken ?? import.meta.env.VITE_API_URL ?? '0.0.0.0';
		this.acessToken = config.acessToken ?? localStorage.getItem('acessToken') ?? '';

		this.client = axios.create({
			baseURL: this.API,
			headers: { Authorization: `Bearer ${this.acessToken}` },
		});
	}

	get(resource: collection, config?: AxiosRequestConfig): FetchQuery<T> {
		return new FetchQuery<T>(this.client, HttpMethods.GET, resource, undefined, config);
	}

	post(
		resource: collection,
		data: Record<string, any>,
		config?: AxiosRequestConfig
	): FetchQuery<T> {
		return new FetchQuery<T>(this.client, HttpMethods.POST, resource, data, config);
	}

	delete(resource: collection, config?: AxiosRequestConfig): FetchQuery<T> {
		return new FetchQuery<T>(this.client, HttpMethods.DELETE, resource, undefined, config);
	}
}
