root = global ? window
Deps.autorun ->
  Template.import.productList = Schema.products.find({}).fetch()

_.extend Template.import,
  showCreateImport: -> Session.get 'showCreateImport'
  showCreateProduct: -> Session.get 'showCreateProduct'
  showAddImportDetail: -> Session.get 'showAddImportDetail'
  showCurrentImport: -> Session.get 'currentImport'

  currentProduct: {}
  formatSearch: (item) -> "#{item.name} [#{item.skulls}]"

  events:
    'click .create-import':     -> change('showCreateImport')
    'click .create-product':    -> change('showCreateProduct')
    'click .add-import-detail': -> change('showAddImportDetail')

    'click .createImport':  (event, template)-> insertImport(template)
    'click .createProduct': (event, template)-> insertProduct(template)
    'click .addImportDetail':   (event, template)-> insertImportDetail(template)


    'click .resetImportDetail': (event, template)-> resetImportDetail(template)
    'click .finish': (event, template)->
      insertImportDetails(template)
      change('showCreateImport')
      Session.set 'currentImport'
#    'click .removeItemTable': -> Schema.importDetails.remove(@_id)


#------------------------------------------------------------------------------------>
_.extend Template.addImportDetail,
  temp: null
  rendered: ->
    $(@find '.sl2').select2
      placeholder: 'chọn sản phẩm'
#      data: {results: Template.addImportDetail.productList, text: 'name'}
      query: (query) -> query.callback
        results: _.filter Template.import.productList, (item) ->
          item.name.indexOf(query.term) > -1 || item.productCode.indexOf(query.term) > -1
        text: 'name'
      initSelection: (element, callback) -> callback(Template.import.currentProduct);

      id: '_id'
      formatSelection: Template.import.formatSearch
      formatResult: Template.import.formatSearch
    .on "change", (e) ->
      Template.import.currentProduct = e.added
    $(@find '.sl2').select2 "val", {_id: Template.import.currentProduct.id}


#----------------Events&&Option-ImportTable-------------------------------------------------------------->
_.extend Template.showImport,
  importCollection: Schema.imports.find({finish: false})
  optionImport: -> return {}
  events:
    'dblclick .reactive-table tr': ->
      Session.set 'currentImport', @
      change('showAddImportDetail')

#Events && Option - ProductTable                -------------------------------------------------->
_.extend Template.showProduct,
  productCollection: Schema.products.find({})

#Events && Option - ImportDetailTable         ------------------------------------------------------->
_.extend Template.showCurrentImportDetail,
  importDetailCollection: -> Schema.importDetails.find({import: (Session.get 'currentImport')._id})
  optionImportDetail: -> return {
    useFontAwesome: true
    fields: [
      { key: 'importQuality',     label: 'Số Lượng' }
      { key: 'importPrice',       label: 'Giá' }
      { key: '', label: 'Xóa', tmpl: Template.removeItem }
    ]
  }




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
      product: Template.import.currentProduct._id
      importQuality: template.find(".importQuality").value
      importPrice: template.find(".importPrice").value
  else
    console.log 'Sai Thong Tin'

insertImportDetails = ->
  currentImport = Import.findOne(Session.get('currentImport')._id)
  currentImport.addImportDetails()

change = (val)->
  if val == 'showCreateImport'
    if Session.get 'showCreateImport' then val = false else val = true
    Session.set 'showCreateImport', val
    Session.set 'showCreateProduct', false
    Session.set 'showAddImportDetail', false

  if val == 'showCreateProduct'
    if Session.get 'showCreateProduct' then val = false else val = true
    Session.set 'showCreateImport', false
    Session.set 'showCreateProduct', val
    Session.set 'showAddImportDetail', false

  if val == 'showAddImportDetail'
    if Session.get 'showAddImportDetail' then val = false else val = true
    Session.set 'showCreateImport', false
    Session.set 'showCreateProduct', false
    Session.set 'showAddImportDetail', val

checkValueProduct = (template)->
 if template.find(".createProduct-name").value.length > 0 and
    template.find(".createProduct-productCode").value.length > 0 and
    template.find(".createProduct-skull").value.length > 0 and
    template.find(".createProduct-price").value > 0
   return true

chekValueImportDetail = (template)->
  if template.find(".importQuality").value > 0 and template.find(".importPrice").value > 0 then return true