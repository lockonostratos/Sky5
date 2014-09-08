Meteor.publish 'customers', -> Schema.customers.find({})
Schema.customers.allow
  insert: -> true
  update: -> true
  remove: -> true

#Meteor.publish 'customerDetails', -> Schema.customerDetails.find({})
#Schema.customerDetails.allow
#  insert: -> true
#  update: -> true
#  remove: -> true

