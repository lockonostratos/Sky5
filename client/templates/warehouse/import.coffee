_.extend Template.import,
  importDetailCollection: Schema.importDetails.find({})
  option: ->
    return {
    fields:
      [
        { key: 'name',              label: 'Tên Sản Phẩm' }
        { key: 'skulls',            label: 'Skull' }
        { key: 'importQuality',     label: 'Số Lượng' }
        { key: 'importPrice',       label: 'Giá' }
        { key: 'version.createdAt', lable: 'Ngày' }
      ]
    }

  events:
    'click .save': (event, template)->
      Schema.importDetails.insert
        import: Schema.imports.findOne({finish: false})._id
        product: Schema.products.findOne({})._id
        importQuality: template.find(".importQuality").value
        importPrice: template.find(".importPrice").value

    'click .remove': (event, template)->
      template.find(".importQuality").value = 0
      template.find(".importPrice").value = 0

