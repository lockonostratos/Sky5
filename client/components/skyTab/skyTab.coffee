tabDep = new Deps.Dependency

_.extend Template.skyTab,
  getTabs: -> tabDep.depend(); @option.tabs
  helpers:
    hTest: -> @guid

  events:
    'click .new-button': -> tabDep.changed(); @option.tabs.push({caption: "New tab"})
    'dblclick span.fa': (event, template) ->
      currentCaption = @caption
      template.data.option.tabs = _.reject template.data.option.tabs, (item) -> item.caption is currentCaption
      tabDep.changed()
      event.stopPropagation()

    'click li': (event, template) ->
      tab.class = '' for tab in template.data.option.tabs
      currentCaption = @caption
      currentTab = _.findWhere template.data.option.tabs, {caption: currentCaption}
#      console.log currentTab, currentCaption, template.data.option.tabs
      currentTab.class = 'active' if currentTab
      tabDep.changed()
  created: ->

  rendered: -> #console.log Template.skyTab

#    Deps.autorun -> console.log Template.skyTab.getTabs()