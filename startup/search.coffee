Meteor.startup ->
  EasySearch.createSearchIndex 'products',
    'collection'    : Schema.products
    'field'         : ['name', 'productCode']
    'limit'         : 8
    'use'           : 'mongo-db'