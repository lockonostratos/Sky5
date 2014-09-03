tabDep = new Deps.Dependency

_.extend Template.skyTab,
  getTabs: -> tabDep.depend(); @option.tabs()
  helpers:
    hTest: -> @guid

  events:
    'click .new-button': (event, template) ->
      newTab = template.data.option.createInstance "new tab"
      newTab.guid = Meteor.uuid()
      tabDep.changed()

    'dblclick span.fa': (event, template) ->
      currentGuid = @guid
      template.data.option.tabs = _.reject template.data.option.tabs, (item) -> item.guid is currentGuid
      tabDep.changed()
      event.stopPropagation()

    'click li': (event, template) ->
      tab.class = '' for tab in template.data.option.tabs
      currentGuid = @guid
      currentTab = _.findWhere template.data.option.tabs, {guid: currentGuid}
      currentTab.class = 'active' if currentTab
      Session.set @currentTab, currentTab
      tabDep.changed()

  created: ->
    tabs = @data.option.tabs()
    tab.guid = Meteor.uuid() for tab in tabs

    tabs[0].class = 'active'
    Session.setDefault @data.option.currentTab, tabs[0]


  rendered: -> #console.log Template.skyTab

#    Deps.autorun -> console.log Template.skyTab.getTabs()