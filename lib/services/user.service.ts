// src/services/offer.service.ts

import APIRoutes from "./http/apiRoutes";
import type { User,FormUser } from "../types/user";
import BaseService from "./common/base.service";
import { StandardResponse } from "./common/response.service";
import { DocumentId } from "../types/common/base_type";
import Query from "./http/Query";

/**
 * Service class to handle User-related API interactions.
 * Extends the generic BaseService with User-specific types.
 */
class UserService extends BaseService<User, FormUser> {
	private static instance: UserService;

	private constructor() {
		super(APIRoutes.USER);
	}

	/**
	 * Retrieves the singleton instance of UserService.
	 * @returns {UserService} - The singleton instance.
	 */
	public static getInstance(): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}
		return UserService.instance;
	}

  // example how you can override basic functions
  async find(
    options: Query | undefined,
		token: string,
  ):Promise<StandardResponse<User[]>>{
    const users : User[] = [{
      documentId: 'abra1',
      email:'test@gmail.com',
      name: 'Nick',
      username: 'test',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]
    const standard : StandardResponse<User[]> ={
      data: users,
      status: 200,
      success: true
    }
    return standard
  }
  // example how you can add new functions for service
  async findNew():Promise<StandardResponse<User[]>>{
    const users : User[] = [{
      documentId: 'abra1',
      email:'test@gmail.com',
      name: 'Nick - new test',
      username: 'test - new test',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]
    const standard : StandardResponse<User[]> ={
      data: users,
      status: 200,
      success: true
    }
    return standard
  }

}

const userService = UserService.getInstance();
export default userService;
