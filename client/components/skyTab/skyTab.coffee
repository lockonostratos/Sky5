tabDep = new Deps.Dependency

_.extend Template.skyTab,
  getTabs: -> tabDep.depend(); @option.tabs
  helpers:
    hTest: -> @guid

  events:
    'click .new-button': -> tabDep.changed(); @option.tabs.push({caption: "New tab"})
    'click span.fa': (event, template) ->
      console.log template.data.option.tabs
      console.log @
    'click li': (event, template) ->
      console.log template
      console.log @
  created: ->

  rendered: -> #console.log Template.skyTab

#    Deps.autorun -> console.log Template.skyTab.getTabs()