root = global ? window

if root.Meteor.isClient
  root.Template.hello.greeting = ->
    'Welcome to Sky5 Engine'
  root.Template.hello.events = 'click input': ->
    console.log 'You clicked the button, FUCK YOU!'

if root.Meteor.isServer
  Meteor.startup ->