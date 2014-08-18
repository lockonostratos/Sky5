root = global ? window
root.Merchant = new Meteor.Collection 'merchants'

if root.Meteor.isClient
  return

if root.Meteor.isServer
  Meteor.startup ->