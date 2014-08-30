tabDep = new Deps.Dependency

_.extend Template.skyTab,
  getTabs: -> tabDep.depend(); @option.tabs
  helpers:
    hTest: -> @guid

  events:
    'click .new-button': -> tabDep.changed(); @option.tabs.push({caption: "New tab"})
  created: ->

  rendered: -> #console.log Template.skyTab

#    Deps.autorun -> console.log Template.skyTab.getTabs()


_.extend Template.childSkyTab,
  events:
    "click span.fa": (event, template) ->
      console.log template