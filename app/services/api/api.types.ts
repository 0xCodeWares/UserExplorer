import { PostsSnapshotIn, UserSnapshotIn } from "@/models"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface UserDetailsResponse {
  users:UserSnapshotIn[]
}

export interface PostsDetailsResponse {
  posts:PostsSnapshotIn[]
}
/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
