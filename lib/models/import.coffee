Schema.add 'imports', class Import
  showImportDetails: -> Schema.importDetails.find({import: @id}).fetch()
  addImportDetails: -> console.log 'add'
#    try
#      for importDetail in importDetails
#        product = Schema.products.findOne importDetail.product
#        if !product then throw 'Không tìm thấy Product'
#
#
#        importDetail.import = @id
#        importDetail.merchant = @data.merchant
#        importDetail.warehouse = @data.warehouse
#        importDetail.creator = @data.creator
#        importDetail.availableQuality = importDetail.importQuality
#        importDetail.instockQuality = importDetail.importQuality
#        importDetail.systemTransaction = transaction.id
#
#        Schema.productDetails.insert importDetail, (error, result) ->
#          if error then throw 'Sai thông tin sản phẩm'
#    catch e
#      console.log e
