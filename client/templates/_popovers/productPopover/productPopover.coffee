_.extend Template.productPopover,
  products: -> Sky.global.personalNewProducts
  events:
    "click ul.grid > li > a.btn": -> console.log @
  rendered: ->
    console.log Sky.global.personalNewProducts