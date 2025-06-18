import { instance } from '@/api/axios';

class AdminService {
	async blockToggleUser(id: number) {
		const response = instance.put(`/users/${id}`);

		return response;
	}

	async deleteUser(id: number) {
		return instance.delete(`/users/${id}`);
	}
}

export const adminService = new AdminService();
