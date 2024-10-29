import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserStoreModel } from "./UserStore"
import { PostsModel } from "./Posts"
import { UserPostsStoreModel } from "./UserPostsStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  userStore: types.optional(UserStoreModel, {}), 
  postsStore: types.optional(UserPostsStoreModel, {})

})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

