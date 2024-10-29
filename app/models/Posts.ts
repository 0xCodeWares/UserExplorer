import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const PostsModel = types
  .model("Posts")
  .props({
    id: types.identifierNumber,
    title: types.string,
    body: types.string,
    tags: types.array(types.string),
    reactions: types.model({
      likes: types.number,
      dislikes: types.number,

    }),
    views: types.number,
    userId: types.number,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Posts extends Instance<typeof PostsModel> { }
export interface PostsSnapshotOut extends SnapshotOut<typeof PostsModel> { }
export interface PostsSnapshotIn extends SnapshotIn<typeof PostsModel> { }

// @mst remove-file