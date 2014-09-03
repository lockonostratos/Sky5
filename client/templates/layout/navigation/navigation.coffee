_.extend Template.navigation,
  dump: 'yeh'
  rendered: ->
    $(@find '.collapse-toggle').tooltip
      placement: 'right'
      container: 'body'
      title: 'mở rộng/thu nhỏ'