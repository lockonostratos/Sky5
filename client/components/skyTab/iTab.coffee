iDep = new Deps.Dependency

Sky.template.extends Template.iTab,
  allTabs: -> iDep.depend(); @options.source()
  getCaption: -> @[UI._templateInstance().data.options.caption ? 'caption']
  activeClass: ->
    return if !UI._templateInstance().data.options.currentTab
    key = UI._templateInstance().data.options.key
    if @[key] is UI._templateInstance().data.options.currentTab[key] then 'active' else ''

  created: ->
    console.log @data
    @data.options.currentTab = @data.options.currentTab ? @data.options.source().fetch()[0]

  ui:
    newButton: "li"

  events:
    "click li:not(.new-button,.active)": (event, template) -> focusTab template.data, @
    "click li.new-button": (event, template) -> createTab(template.data)
    "dblclick span.fa": (event, template) -> destroyTab(template.data, @); event.stopPropagation()

focusTab = (context, recentTab) ->
  context.options.currentTab = recentTab
  iDep.changed()

createTab = (context) -> context.options.instanceCreator(); iDep.changed()

destroyTab = (context, instance) ->
  return if context.options.currentTab.brandNew

  context.options.currentTab = context.options.instanceDestroyer(instance)
  if context.options.source().length is 0
    newTab = context.options.instanceCreator()
    newTab.brandNew = true
    context.options.currentTab = newTab

  context.options.currentTab.class = 'active'
  iDep.changed()