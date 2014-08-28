Deps.autorun ->
  Template.warehouse.productList = Schema.products.find({}).fetch()

_.extend Template.warehouse,
  currentProduct: {}
  formatSearch: (item) -> "#{item.name} [#{item.skulls}]"
  rendered: ->
    $(@find '.sl2').select2
      placeholder: 'chọn sản phẩm'
      query: (query) -> query.callback
        results: _.filter Template.warehouse.productList, (item) ->
          item.name.indexOf(query.term) > -1 || item.productCode.indexOf(query.term) > -1
        text: 'name'
      initSelection: (element, callback) -> callback(Template.warehouse.currentProduct);

      id: '_id'
      formatSelection: Template.warehouse.formatSearch
      formatResult: Template.warehouse.formatSearch
    .on "change", (e) ->
      Template.warehouse.currentProduct = e.added
    $(@find '.sl2').select2 "val", Template.warehouse.currentProduct