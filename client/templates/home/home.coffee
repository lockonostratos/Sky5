_.extend Template.home,
  engineName: 'Sky5 Engine!'
  rendered: ->
    console.log "Home is showing up, awesome!"; return
  events:
    'click input': -> console.log 'Fuck YOU!'
    'click h1': -> console.log 'text clicked'