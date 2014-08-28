root = global ? window
_.extend Template.import,
  showCreateImport: -> Session.get 'showCreateImport'
  showAddImportDetail: -> true
  showAllImport: -> Session.get 'showCreateImport'
  showImportDetail: -> true

  importCollection: Schema.imports.find({})
  importDetailCollection: Schema.importDetails.find({})
  optionImportDetail: -> return {
    useFontAwesome: true
    fields: [
      { key: 'importQuality',     label: 'Số Lượng' }
      { key: 'importPrice',       label: 'Giá' }
      { key: '', label: 'Xóa', tmpl: Template.removeItem }
    ]
  }


  events:
    'click .createImport': (template)-> insertImport(template)
    'click .save': (template)-> insertImportDetail(template)
    'click .remove': (template)-> resetValue(template)
    'click .removeItem': -> Schema.importDetails.remove(this._id)
    'click .finish': -> insertImportDetails()

resetValue = (template)->
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

insertImportDetail = (template)->
  if template.find(".importQuality").value > 0 and template.find(".importPrice").value > 0
    Schema.importDetails.insert
      import: Schema.imports.findOne({finish: false})._id
      product: Schema.products.findOne({})._id
      importQuality: template.find(".importQuality").value
      importPrice: template.find(".importPrice").value
  else
    console.log 'so nho hon khong'

insertImportDetails = ->
  import: Session.get 'currentImport'
  insertImportDetails.import.addImportDetails()


