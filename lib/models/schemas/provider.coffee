Schema2.providers = new SimpleSchema(
  merchant:
    type: String

  creator:
    type: String

  name:
    type: String

  location: { type: Schema.Location, optional: true }
  version: { type: Schema.Version }
)

Schema.add 'providers'
