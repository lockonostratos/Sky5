Sky.template.extends Template.iTab,
  allTabs: -> Session.get @options.source
  getCaption: -> @[UI._templateInstance().data.options.caption ? 'caption']
  activeClass: ->
    currentTab = Session.get(UI._templateInstance().data.options.currentTab)
    return if !currentTab

    key = UI._templateInstance().data.options.key
    if @[key] is currentTab[key] then 'active' else ''

  created: ->
    allTabs = Session.get(@data.options.source)
    Session.set @data.options.currentTab, allTabs[0] if Session.get(@data.options.currentTab) is undefined

  ui:
    newButton: "li"

  events:
    "click li:not(.new-button,.active)": (event, template) -> focusTab template.data, @
    "click li.new-button": (event, template) -> createTab(template.data)
    "dblclick span.fa": (event, template) -> destroyTab(template.data, @); event.stopPropagation()

focusTab = (context, recentTab) -> Session.set context.options.currentTab, recentTab

createTab = (context) -> context.options.instanceCreator()

destroyTab = (context, instance) ->
  context.options.instanceDestroyer(instance)
  if Session.get(context.options.source).length is 0
    newTab = context.options.instanceCreator()
    Session.set context.option.currentTab, newTab