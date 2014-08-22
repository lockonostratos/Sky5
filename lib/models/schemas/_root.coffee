root = global ? window
root.Schema =
  Dictionary: []
  registerDictionary: (ref, key) -> Schema.Dictionary.push { value: ref, key: key }
  find: (key) ->
    found = _.findWhere Schema.Dictionary, { key: key }
    return found?.value

root.Schema2 = {}
root.Model = {}
root.System = {}

Schema.SystemTransaction = new SimpleSchema


Schema.Version = new SimpleSchema
  createdAt:
    type: Date
    autoValue: ->
      if @isInsert
        return new Date
      else if @isUpsert
        return { $setOnInsert: new Date }
      else
        @unset(); return

  updateAt:
    type: Date
    autoValue: ->
      return new Date() if @isUpdate
      return
    denyInsert: true
    optional: true

Schema.Location = new SimpleSchema
  address:
    type: [String]
    optional: true

  areas:
    type: [String]
    optional: true


Schema.ChildProduct = new SimpleSchema
  product:
    type: String

  quality:
    type: Number