_.extend Template.productPopover,
  error: -> Session.get 'errorProductPopover'
  products: -> Sky.global.personalNewProducts

  events:
    'click .create': (event, template)->
      if template.find(".productCode").value.length < 1 || template.find(".productCode").value.length > 15
        Session.set 'errorProductPopover', 'Mã sản phẩm có từ 10 đến 13 ký tự '; return
      else
        Session.set 'errorProductPopover'
      if template.find(".name").value.length < 10
        Session.set 'errorProductPopover', 'Tên sản phẩm phải lớn hơn 10 ký tự '; return
      else
        Session.set 'errorProductPopover'
      if template.find(".skull").value.length < 1
        Session.set 'errorProductPopover', 'Loại sản phẩm không được để trống '; return
      else
        Session.set 'errorProductPopover'

      Schema.products.insert
        merchant         : currentMerchant._id
        warehouse        : currentWarehouse._id
        creator          : Meteor.userId()
        productCode      : template.find(".productCode").value
        name             : template.find(".name").value
        skulls           : [template.find(".skull").value]
        totalQuality     : 0
        availableQuality : 0
        instockQuality   : 0
        price            : 0
      ,(e,r)->
        if r
          template.find(".productCode").value = null
          template.find(".name").value = null
          template.find(".skull").value = null
        else
          Session.set 'errorProductPopover', 'Có lỗi trong quá trình tạo'
          console.log e

    'click .productRemove': (event, template)->
      if @totalQuality == 0
        Schema.products.remove @_id
      else
        console.log 'Loi, Khong The Xoa Duoc'

  rendered: ->
#    if !template.find(".productCode").value and !template.find(".name").value and !template.find(".skull").value then Session.set 'errorProductPopover'
    console.log Sky.global.personalNewProducts