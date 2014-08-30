Deps.autorun ->
  Template.warehouse.productList = Schema.products.find({}).fetch()

_.extend Template.warehouse,
  currentProduct: {}
  tabOption:
    name: "Default"
    tabs: [{caption: "tab 1", class: "active"}, {caption: "tab 2"}, {caption: "tab 3"}]
    createAction: =>
      Template.warehouse.tabOption.tabs.push { caption: "new" }
      console.log Template.warehouse.tabOption.tabs
  tabOption2:
    name: "Noo"
    tabs: [{caption: "tab 1", class: "active"}]
    createAction: =>
      Template.warehouse.tabOption.tabs.push { caption: "new" }
      console.log Template.warehouse.tabOption.tabs
  selectNewProduct: ->
    Template.warehouse.ui.selectBox.select2("open")
  addNewProduct: ->
    console.log 'adding new product..'

  formatSearch: (item) -> "#{item.name} [#{item.skulls}]"

  rendered: ->
    Template.warehouse.ui = {}
    Template.warehouse.ui.selectBox = $(@find '.sl2')
    $(document).bind 'keyup', 'return', Template.warehouse.selectNewProduct
    Template.warehouse.ui.selectBox.bind 'keyup', 'ctrl+return', Template.warehouse.addNewProduct

    Template.warehouse.ui.selectBox.select2
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
      console.log e.val
    Template.warehouse.ui.selectBox.select2 "val", Template.warehouse.currentProduct

  destroyed: ->
    $(document).unbind 'keyup', Template.warehouse.selectNewProduct
    $(document).unbind 'keyup', Template.warehouse.addNewProduct