export class OneAPI {
	#host;
	#apiToken;
	#portalHost;
	constructor() {
		this.#host = 'https://api.microtronics.one';
		this.#portalHost = 'https://portal.microtronics.one'
		this.#apiToken = null;
	}

	set apiHost(host) {
		if (!host) return;
		this.#host = host
	}

	get apiHost() {
		return this.#host;
	}
	get portalHost() {
		return this.#portalHost;
	}
	
	set apiToken(token) {
		this.#apiToken = token || null;
	}

	/**
	 *
	 * @param method
	 * @param apiPath
	 * @param data
	 * @returns {Promise<void>}
	 */
	async fetchData(method, apiPath, data=null) {
		const options = {
			credentials: 'include',
			rejectUnauthorized: false,
			method: method,
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (this.#apiToken)
			options.headers['Authorization'] = `Bearer ${this.#apiToken}`;

		if (data) {
			options.body = data;
			options.headers['Content-Length'] = (new TextEncoder().encode(data)).length;
		}
		const res = await fetch(`${this.#host}${apiPath}`, options);
		const txt = await res.text();
		if (txt) return JSON.parse(txt);
	}

	async getDevice(deviceId) {
		const device = new Device({
			id: deviceId
		});
		await device.getStatus();
		return device;
	}

}
export const ONE_API = new OneAPI();

export class Device {
	constructor(deviceId) {
		this.id = deviceId;
		this.status = {};
		this.blueprint = {};
	}

	get name() {
		return this.status.name;
	}

	get serialNumber() {
		return this.status.serialNumber;
	}

	get statusPage() {
		return `${ONE_API.portalHost}/apps/${this.status.application.id}/devices/${this.id}/status`
	}

	/**
	 * Fetch some basic device information
	 * @returns {Promise<void>}
	 */
	async initialize() {
		this.status = await this.getStatus();
	}

	async getStatus() {
		return await ONE_API.fetchData('GET', `/1/devices/${this.id}`);
	}

	async getBlueprint() {
		this.blueprint = await ONE_API.fetchData('GET', `/1/devices/${this.id}/blueprint`);
		return this.blueprint;
	}

	async getContainer(containerName, options={}) {
		const searchParams = new URLSearchParams(options).toString();
		return await ONE_API.fetchData('GET', `/1/devices/${this.id}/containers/${containerName}?${searchParams}`);
	}

	async getTimeseries(containerName, options={}) {
		const searchParams = new URLSearchParams(options).toString();
		return await ONE_API.fetchData('GET', `/1/devices/${this.id}/containers/${containerName}/timeseries?${searchParams}`);
	}

	async writeContainer(containerName, data) {
		return await ONE_API.fetchData('PUT', `/1/devices/${this.id}/containers/${containerName}`, JSON.stringify(data));
	}

}

export default ONE_API;
