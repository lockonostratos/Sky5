_.extend Template.productPopover,
  products: -> Sky.global.personalNewProducts
  events:
    "click a": -> console.log 'clicked popover!'
  rendered: ->
    console.log Sky.global.personalNewProducts