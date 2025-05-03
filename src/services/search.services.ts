import { instance } from '@/api/axios';

class SearchService {
	private __SEARCH = '/search';

	async search($query: string) {
		return instance.get(`${this.__SEARCH}?query=${$query}`);
	}
}

export const searchService = new SearchService();
