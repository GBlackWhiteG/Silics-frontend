import { instance } from '@/api/axios';

class AdminService {
	async blockToggleUser(id: number) {
		const response = instance.put(`/users/${id}`);

		return response;
	}
}

export const adminService = new AdminService();
