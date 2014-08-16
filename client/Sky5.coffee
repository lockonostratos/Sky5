root = global ? window

if root.Meteor.isClient
  return

if root.Meteor.isServer
  Meteor.startup ->