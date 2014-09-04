iDep = new Deps.Dependency

Sky.template.extends Template.iTab,
  allTabs: -> iDep.depend(); @allTabs

  created: ->
    allTabs = @data.source
    currentTab.guid = Meteor.uuid() for currentTab in allTabs
    allTabs[0].class = 'active'

  rendered: ->

  ui:
    newButton: "li"

  events:
    "click li": -> console.log @


