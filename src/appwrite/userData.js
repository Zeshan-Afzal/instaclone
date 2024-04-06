import { Client, Databases, Storage, ID } from "appwrite";
import config from "../config";
export class UserData {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.AppwriteUrl)
      .setProject(config.AppwriteProjectId);
    this.storage = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

  async createFile(id, file) {
    try {
      return this.storage.createFile(config.AppwriteBucketId, id, file);
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

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(config.AppwriteBucketId, fileId);
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

  async getFile(fileId) {
    try {
      return this.storage.getFile(config.AppwriteBucketId, fileId);
    } catch (error) {
      throw error;
    }
  }
  async deleteFile(fileId) {
    try {
      return this.storage.deleteFile(config.AppwriteBucketId, fileId);
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

  async createDocument(docId, { userId, avatarImage, bio, name }) {
    try {
      return this.databases.createDocument(
        config.AppwriteDatabaseId,
        config.AppwriteUserAvatarCollectionId,
        docId,
        { userId, avatarImage, bio, name }
      );
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

  async getDoc(docId) {
    try {
      return this.databases.getDocument(
        config.AppwriteDatabaseId,
        config.AppwriteUserAvatarCollectionId,
        docId
      );
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
  async deleteDoc(docId) {
    try {
      return this.databases.deleteDocument(
        config.AppwriteDatabaseId,
        config.AppwriteUserAvatarCollectionId,
        docId
      );
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

const userData = new UserData();
export default userData;
