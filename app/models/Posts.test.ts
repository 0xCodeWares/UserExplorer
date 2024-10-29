import { PostsModel } from "./Posts"

test("can be created", () => {
  const instance = PostsModel.create({})

  expect(instance).toBeTruthy()
})

// @mst remove-file