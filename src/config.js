const config = {
  AppwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  AppwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  AppwriteUserAvatarCollectionId: String(
    import.meta.env.VITE_APPWRITE_USER_AVATAR_COLLECTION_ID
  ),
  AppwriteUserPostsCollectionId: String(
    import.meta.env.VITE_APPWRITE_USER_POSTS_COLLECTION_ID
  ),
  AppwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  AppwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
