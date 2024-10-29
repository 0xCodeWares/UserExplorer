import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * This represents user details.
 */
export const UserModel = types
  .model("User")
  .props({
    id: types.identifierNumber,
    firstName:types.string,
    lastName:types.string,
    age:types.number ,
    gender: types.string,
    email: types.string,
    phone: types.string,
    address:types.model({
      address:types.string,
      city:types.string,
      state:types.string,
      country:types.string
    }),
    company:types.model({
      department:types.string,
      name:types.string,
      title:types.string
    }),
    image:types.string
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> { }
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> { }
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> { }

// @mst remove-file