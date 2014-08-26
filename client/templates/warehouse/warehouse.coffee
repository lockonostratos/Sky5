_.extend Template.warehouse,
  data: -> Schema.products.find({})
  rendered: ->
    data=[{id:0,tag:'enhancement'},{id:1,tag:'bug'},{id:2,tag:'duplicate'},{id:3,tag:'invalid'},{id:4,tag:'wontfix'}]
    format = (item) -> item.name

    $(@find '.sl2').select2
      data: { results: Template.warehouse.data(), text: 'name' }
      formatSelection: format
      formatResult: format