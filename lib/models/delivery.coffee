root = global ? window
root.Deliveries        = new Meteor.Collection 'deliveries'
root.Books         = new Meteor.Collection 'books'
root.Lists         = new Meteor.Collection 'lists'
root.Todos         = new Meteor.Collection 'todos'


#  Schemas.Delivery = new SimpleSchema(
#    warehouseId:
#      type: String
#    orderId:
#      type: String
#    creatorId:
#      type: String
#    deliveryAddress:
#      type: String
#    contactName:
#      type: String
#    contactPhone:
#      type: String
#    deliveryDate:
#      type: Date
#    comment:
#      type: String
#    transportationFee:
#      type: Number
#    shipper:
#      type: String
#    export:
#      type: String
#    import:
#      type: String
#    cashier:
#      type: String
#    createdAt:
#      type: Date
#    updatedAt:
#      type: Date
#  )
