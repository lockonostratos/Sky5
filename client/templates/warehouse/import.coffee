root = global ? window
Deps.autorun ->
  Template.addImportDetail.productList = Schema.products.find({}).fetch()

#---- Import --------------------------------------------------------------->
_.extend Template.import,
  showCreateImport: -> Session.get 'showCreateImport'
  showAddImportDetail: -> Session.get 'showAddImportDetail'
  showCreateProduct: -> Session.get 'showCreateProduct'
  showOrder: -> Session.get 'showOrder'

  showCurrentImport: -> Session.get 'currentImport'
  showCurrentOrder: -> Session.get 'currentOrder'




  events:
    'click .create-import':     -> change('showCreateImport')
    'click .add-import-detail': -> change('showAddImportDetail')
    'click .create-product':    -> change('showCreateProduct')
    'click .sale-product': -> change('showOrder')

# ---- showCreateImport  -------------------------------------------------------------->
_.extend Template.createImport,
  importCollection: Schema.imports.find({finish: false})
  optionImport: -> return {}
  events:
    'click .createImport':  (event, template)-> insertImport(template)
    'dblclick .reactive-table tr': ->
      console.log @
      Session.set 'currentImport', @
      change('showAddImportDetail')

# ---- showAddImportDetail -------------------------------------------------------------------------------->
_.extend Template.addImportDetail,
  importDetailCollection: -> Schema.importDetails.find({import: (Session.get 'currentImport')._id})
  optionImportDetail: -> return {
    useFontAwesome: true
    fields: [
      { key: 'importQuality',     label: 'Số Lượng' }
      { key: 'importPrice',       label: 'Giá' }
      { key: '', label: 'Xóa', tmpl: Template.removeItem }
    ]
  }
  currentProduct: {}
  formatSearch: (item) -> "#{item.name} [#{item.skulls}]"

  events:
    'click .addImportDetail':   (event, template)-> insertImportDetail(template)

    'click .finish': (event, template)->
      insertImportDetails(template)
      change('showCreateImport')
      Session.set 'currentImport'

    'dblclick .reactive-table tr': ->
      Template.addImportDetail.currentProduct = Schema.products.findOne(@product)
      Template.addImportDetail.ui.selectBox.select2 "val", Template.addImportDetail.currentProduct
#    'click .resetImportDetail': (event, template)-> resetImportDetail(template)
#    'click .removeItemTable': -> Schema.importDetails.remove(@_id)

  rendered: ->
    Template.addImportDetail.ui = {}
    Template.addImportDetail.ui.selectBox = $(@find '.sl2')
    $(@find '.sl2').select2
      placeholder: 'chọn sản phẩm'
      query: (query) -> query.callback
        results: _.filter Template.addImportDetail.productList, (item) ->
          item.name.indexOf(query.term) > -1 || item.productCode.indexOf(query.term) > -1
        text: 'name'
      initSelection: (element, callback) -> callback(Template.addImportDetail.currentProduct)
      allowClear: true

      id: '_id'
      formatSelection: Template.addImportDetail.formatSearch
      formatResult: Template.addImportDetail.formatSearch
    .on "change", (e) ->
      Template.addImportDetail.currentProduct = e.added
    $(@find '.sl2').select2 "val", Template.addImportDetail.currentProduct

# ----Show-Product-------------------------------------------------------------------->
_.extend Template.createProduct, productCollection: Schema.products.find({})


# ----Show-Order--------------------------------------------------------------------->
_.extend Template.createOrder,
  orderCollection: Schema.orders.find({})
  orderDetailCollection: Schema.orderDetails.find({})
  events:
    'click .createOrder': -> console.log 'order'






    'click .createOrderDetail': -> console.log 'orderDetail'





#----------------------------------------------------------------------------------------------------->
resetImportDetail = (template)->
  template.find(".importQuality").value = 0
  template.find(".importPrice").value = 0

insertImport = (template)->
  if template.find(".createImport-description").value
    Schema.imports.insert
      merchant: root.currentMerchant._id
      warehouse: root.currentWarehouse._id
      creator: 'sang'
      description: template.find(".createImport-description").value
      finish: false
  else
    console.log 'khong duoc de trong'

insertProduct = (template)->
  if checkValueProduct(template)
    console.log '1'
    merchant = Merchant.findOne(root.currentMerchant._id)
    console.log template.find(".createProduct-skull").value
    merchant.addProduct
      creator: 'Sang'
      warehouse: root.currentWarehouse._id
      name: template.find(".createProduct-name").value
      productCode: template.find(".createProduct-productCode").value
      skulls: [template.find(".createProduct-skull").value]
      price: template.find(".createProduct-price").value
  else
    console.log 'Sai Thông Tin'

insertImportDetail = (template)->
  if chekValueImportDetail(template)
    Schema.importDetails.insert
      import: (Session.get 'currentImport')._id
      product: Template.addImportDetail.currentProduct._id
      importQuality: template.find(".importQuality").value
      importPrice: template.find(".importPrice").value
  else
    console.log 'Sai Thong Tin'

insertImportDetails = ->
  currentImport = Import.findOne(Session.get('currentImport')._id)
  currentImport.addImportDetails()

checkValueProduct = (template)->
 if template.find(".createProduct-name").value.length > 0 and
    template.find(".createProduct-productCode").value.length > 0 and
    template.find(".createProduct-skull").value.length > 0 and
    template.find(".createProduct-price").value > 0
   return true

chekValueImportDetail = (template)->
  if template.find(".importQuality").value > 0 and template.find(".importPrice").value > 0
    return true

change = (val)->
  if val == 'showCreateImport'
    if Session.get 'showCreateImport' then val = false else val = true
    Session.set 'showCreateImport', val
    Session.set 'showCreateProduct', false
    Session.set 'showAddImportDetail', false
    Session.set 'showOrder', false

  if val == 'showCreateProduct'
    if Session.get 'showCreateProduct' then val = false else val = true
    Session.set 'showCreateImport', false
    Session.set 'showCreateProduct', val
    Session.set 'showAddImportDetail', false
    Session.set 'showOrder', false

  if val == 'showAddImportDetail'
    if Session.get 'showAddImportDetail' then val = false else val = true
    Session.set 'showCreateImport', false
    Session.set 'showCreateProduct', false
    Session.set 'showAddImportDetail', val
    Session.set 'showSaleProduct', false

  if val == 'showOrder'
    if Session.get 'showOrder' then val = false else val = true
    Session.set 'showCreateImport', false
    Session.set 'showCreateProduct', false
    Session.set 'showAddImportDetail', false
    Session.set 'showOrder', val