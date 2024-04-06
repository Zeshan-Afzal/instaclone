import { Client, Account, ID } from "appwrite";
import config from "../config";

export class auth {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.AppwriteUrl)
      .setProject(config.AppwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccout({ email, password, name }) {
    try {
      const account = await this.account.create(
        ID.unique(),

        email,
        password,
        name
      );
      if (account) {
        return this.login({ email, password });
      }
    } catch (error) {
      if (error.code === 1001) {
        console.log("Validation error: ", error.message);
      } else if (error.code === 5000) {
        console.log("Internal server error: ", error.message);
      } else {
        console.log("Unknown error: ", error);
      }

      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return this.account.createEmailSession(email, password);
    } catch (error) {
      if (error.code === 1001) {
        console.log("Validation error: ", error.message);
      } else if (error.code === 5000) {
        console.log("Internal server error: ", error.message);
      } else {
        console.log("Unknown error: ", error);
      }

      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 1001) {
        console.log("Validation error: ", error.message);
      } else if (error.code === 5000) {
        console.log("Internal server error: ", error.message);
      } else {
        console.log("Unknown error: ", error);
      }

      throw error;
    }
  }

  async logout() {
    try {
      return this.account.deleteSessions();
    } catch (error) {
      if (error.code === 1001) {
        console.log("Validation error: ", error.message);
      } else if (error.code === 5000) {
        console.log("Internal server error: ", error.message);
      } else {
        console.log("Unknown error: ", error);
      }

      throw error;
    }
  }
}

const authSerivce = new auth();
export default authSerivce;
