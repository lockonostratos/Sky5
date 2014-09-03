Meteor.publish 'orderHistoryWithDetails', (userId) ->
  Meteor.publishWithRelations
    handle: this
    collection: Schema.orders
    filter: { creator: userId }
    mappings: [
      { key: 'order', collection: Schema.orderDetails }
    ]


Meteor.publish 'products', ->
#  products = Schema.products.find {}
#  userIds = products.map (i) -> i.creator
#
#  return [products, Meteor.users.find({_id: {$in: userIds}})]

  Meteor.publishWithRelations
    handle: this
    collection: Schema.products
    filter: {}
    mappings: [
      reserve: true
      key: 'product'
      collection: Schema.productDetails
    ]

#Meteor.publish('post', function(id) {
#Meteor.publishWithRelations({
#    handle: this,
#    collection: Posts,
#    filter: id,
#    mappings: [{
#      key: 'authorId',
#      collection: Meteor.users
#    }, {
#      reverse: true,
#      key: 'postId',
#      collection: Comments,
#      filter: { approved: true },
#      options: {
#        limit: 10,
#        sort: { createdAt: -1 }
#      },
#      mappings: [{
#        key: 'userId',
#        collection: Meteor.users
#      }]
#    }]
#  });
#});