Deps.autorun ->
  Template.returns.saleList = Schema.sales.find({status: true}).fetch()
  if Session.get 'currentReturn'
    Template.returns.saleDetailList = Schema.saleDetails.find({sale: Session.get('currentReturn').sale}).fetch()
  Template.returns.returnsList = Schema.returns.find({}).fetch()


_.extend Template.returns,

  returnCollection: Schema.returns.find()
  formatSearchSale: (item) -> "#{item.orderCode}"
  formatSearchReturn: (item) -> "#{item.returnCode}"
  formatSearchProduct: (item) -> "#{item.product}"

  events:
    'click .createReturns': (event, template) ->
      if template.find(".returnCode").value.length > 0 and template.find(".comment").value.length > 0 and Template.returns.currentSale
        Schema.returns.insert
          merchant      : currentMerchant._id
          warehouse     : currentWarehouse._id
          sale          : Template.returns.currentSale._id
          creator       : Meteor.userId()
          returnCode    : template.find(".returnCode").value
          comment       : template.find(".comment").value
          productSale   : 0
          productQuality: 0
          totalPrice    : 0
          status        : 0
      else
        console.log 'thông tin quá ngắn'

  rendered: ->
    Template.returns.ui = {}
    #------------------------------------------------------------------------------
    Template.returns.ui.selectBoxSale = $(@find '.sl2')
    Template.returns.ui.selectBoxSale.select2
      placeholder: 'CHỌN PHIẾU ORDER'
      query: (query) -> query.callback
        results: _.filter Template.returns.saleList, (item) ->
          item.orderCode.indexOf(query.term) > -1
        text: 'name'
      initSelection: (element, callback) -> callback(Session.get 'currentSale');
      id: '_id'
      formatSelection : Template.returns.formatSearchSale
      formatResult    : Template.returns.formatSearchSale
    .on "change", (e) ->
      Session.set 'currentSale', e.added
    Template.returns.ui.selectBoxSale.select2 "val", Session.get 'currentSale'

    #------------------------------------------------------------------------------
    Template.returns.ui.selectBoxReturns = $(@find '.sl3')
    Template.returns.ui.selectBoxReturns.select2
      placeholder: 'CHỌN PHIẾU RETURN'
      query: (query) -> query.callback
        results: _.filter Template.returns.returnsList, (item) ->
          item.returnCode.indexOf(query.term) > -1
        text: 'name'
      initSelection: (element, callback) -> callback(Session.get 'currentReturn');

      id: '_id'
      formatSelection: Template.returns.formatSearchReturn
      formatResult: Template.returns.formatSearchReturn
    .on "change", (e) ->
      Session.set 'currentReturn', e.added
    Template.returns.ui.selectBoxReturns.select2 "val", Session.get 'currentReturn'


    #------------------------------------------------------------------------------
    Template.returns.ui.selectBoxProductDetail = $(@find '.sl4')
    Template.returns.ui.selectBoxProductDetail.select2
      placeholder: 'CHỌN PHIẾU Product'
      query: (query) -> query.callback
        results: _.filter Template.returns.saleDetailList, (item) ->
          item.product.indexOf(query.term) > -1
        text: 'name'

      initSelection: (element, callback) -> callback(Session.get 'currentProductDetail');

      id: '_id'
      formatSelection: Template.returns.formatSearchProduct
      formatResult: Template.returns.formatSearchProduct
    .on "change", (e) ->
      Session.set 'currentProductDetail', e.added
    Template.returns.ui.selectBoxProductDetail.select2 "val", Session.get 'currentProductDetail'