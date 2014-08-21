#Meteor.startup ->
#  if Schema.Merchant.find().count() is 0
#    merchant = Schema.Merchant.insert
#