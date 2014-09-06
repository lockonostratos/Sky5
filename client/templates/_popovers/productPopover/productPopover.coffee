#Deps.autorun ->

#  Sess = Schema.sales.find({status: true}).fetch()

Sky.template.extends Template.productPopover,
  ui:
    selectSkull: '.sl2'

  error: -> Session.get 'errorProductPopover'
  products: -> Sky.global.personalNewProducts
  selectNewProduct: -> Template.warehouse.ui.selectBox.select2("open")
  formatSearchSkull: (item) -> "#{item.value}"

  currentProduct: {}
  events:
    'click .create': (event, template)->
      console.log template.find(".skull").value
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
        skulls           : ['ĐƠN VỊ TÍNH', '1L', 'QUI CÁCH', 'Thùng']
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
    $(@ui.selectSkull).select2
      placeholder: 'CHỌN PHIẾU Mã Loai'
      query: (query) -> query.callback
        results: _.filter Session.get('skullList'), (item) ->
          item.value.indexOf(query.term) > -1
        text: 'name'
      initSelection: (element, callback) -> callback(Session.get 'currentSkulls');
      id: '_id'
      formatSelection : Template.productPopover.formatSearchSkull
      formatResult    : Template.productPopover.formatSearchSkull
      multiple: true
    .on "change", (e) ->
      if e.added
        currentSkulls = []; if Session.get 'currentSkulls' then currentSkulls = Session.get 'currentSkulls'
        currentSkulls.push e.added
      if e.removed
        currentSkulls = _.filter(Session.get('currentSkulls'), (item) -> item._id isnt e.removed._id)
      Session.set 'currentSkulls', currentSkulls
      console.log _.chain(Session.get('currentSkulls')).map((group, key) -> return { name: key}).value()
    $(@ui.selectSkull).select2 "val", Session.get 'currentSkulls'

  destroy: ->
    $(@ui.selectSkull).select2('destroy')
#    console.log Sky.global.personalNewProducts