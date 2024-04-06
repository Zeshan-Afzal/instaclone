import { Client, Databases, Storage, ID } from "appwrite";
import config from "../config";

export class UserPosts {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.AppwriteUrl)
      .setProject(config.AppwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.id = ID.unique();
  }

  async createPost({ caption, userId, username, image }) {
    try {
      return this.databases.createDocument(
        config.AppwriteDatabaseId,
        config.AppwriteUserPostsCollectionId,
        this.id,
        {
          caption,
          userId,
          username,
          image,
        }
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

  async getAllPost() {
    try {
      return this.databases.listDocuments(
        config.AppwriteDatabaseId,
        config.AppwriteUserPostsCollectionId
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
  async getUserPost(queries) {
    try {
      return this.databases.listDocuments(
        config.AppwriteDatabaseId,
        config.AppwriteUserPostsCollectionId,
        queries
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

  async getSiglePost(docId) {
    try {
      return this.databases.getDocument(
        config.AppwriteDatabaseId,
        config.AppwriteUserPostsCollectionId,
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

  async deletePost(docId) {
    try {
      return this.databases.deleteDocument(
        config.AppwriteDatabaseId,
        config.AppwriteUserPostsCollectionId,
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
  async updatePost(docId, { caption, image }) {
    try {
      return this.databases.updateDocument(
        config.AppwriteDatabaseId,
        config.AppwriteUserPostsCollectionId,
        docId,
        { caption, image }
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

  //  for file
  async uploadePostFile(file) {
    try {
      return this.storage.createFile(config.AppwriteBucketId, this.id, file);
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
  getPostFilePreview(fileId) {
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
}

const userPosts = new UserPosts();
export default userPosts;
