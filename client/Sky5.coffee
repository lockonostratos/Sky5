root = global ? window
root.Merchant = new Meteor.Collection 'merchants'

root.Lists = new Meteor.Collection "lists"
root.Todos = new Meteor.Collection "todos"

root.Books = new Meteor.Collection "books"



if root.Meteor.isClient
  Schemas = {}

  Schemas.Merchant = new SimpleSchema(
    headquater:
      type: String
    name:
      type: String
    createdAt:
      type: Date
    updatedAt:
      type: Date

  )

  Books.attachSchema(Schemas.Book)

  return


if root.Meteor.isServer
  Meteor.startup ->


