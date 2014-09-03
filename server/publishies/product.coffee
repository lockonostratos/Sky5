Meteor.publish 'products', -> Schema.products.find {}
Schema.products.allow
  insert: -> true
  update: -> true
  remove: -> true

Meteor.publish 'productDetails', -> Schema.productDetails.find {}
Schema.productDetails.allow
  insert: -> true
  update: -> true
  remove: -> true