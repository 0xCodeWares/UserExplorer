import { Instance, SnapshotOut, types, unprotect } from "mobx-state-tree"
import { api } from "../services/api"
import { User, UserModel } from "./User"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const UserStoreModel = types
  .model("UserStore")
  .props({
    users: types.array(UserModel),
    isLoading: types.optional(types.boolean, false),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    async fetchUsers() {
      
      const response = await api.getUserList()
      if (response.kind === "ok") {
        self.setProp("users", response.users)
      } else {
        console.error(`Error fetching users: ${JSON.stringify(response)}`)
      }
    },
  }))
  .views((store) => ({
    get usersList() {
      return store.users
    },
  }))

export interface UserStore extends Instance<typeof UserModel> { }
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> { }

// @demo remove-file
