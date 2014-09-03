_.extend Template.navigation,
  rendered: ->
    $(@find '.collapse-toggle').tooltip
      placement: 'right'
      container: 'body'
      title: 'mở rộng/thu nhỏ'