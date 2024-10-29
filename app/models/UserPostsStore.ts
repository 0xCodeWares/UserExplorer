import { Instance, SnapshotOut, types, unprotect } from "mobx-state-tree"
import { api } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { PostsModel } from "./Posts"

export const UserPostsStoreModel = types
  .model("UserPostsStore")
  .props({
    posts: types.array(PostsModel),
    isLoading: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchUserPosts(userId:number) {
      const response = await api.getUserPosts(userId)
      if (response.kind === "ok") {
        console.log( response)
        self.setProp("posts", response.posts)
      } else {
        console.error(`Error fetching users: ${JSON.stringify(response)}`)
      }
    },
  }))
  .views((store) => ({
    get postsList() {
      // const start = store.currentPage * store.pageSize
      // const end = start + store.pageSize
      return store.posts
    },

  }))

export interface UserPostsStore extends Instance<typeof PostsModel> { }
export interface UserPostsStoreSnapshot extends SnapshotOut<typeof UserPostsStoreModel> { }

// @demo remove-file
