Merchants       = new Meteor.Collection 'merchants'
Warehouses      = new Meteor.Collection 'warehouses'
Providers       = new Meteor.Collection 'providers'
Skulls          = new Meteor.Collection 'skulls'
Products        = new Meteor.Collection 'products'
ProductSummaries = new Meteor.Collection 'product_summaries'
MetroSummaries   = new Meteor.Collection 'metro_summaries'

Orders          = new Meteor.Collection 'orders'
OrderDetails = new Meteor.Collection 'order_details'
Deliveries = new Meteor.Collection 'deliveries'
Returns = new Meteor.Collection 'returns'
ReturnDetails = new Meteor.Collection 'return_details'

Imports = new Meteor.Collection 'imports'
ImportDetales = new Meteor.Collection 'import_details'
Exports = new Meteor.Collection 'exmports'
ExportDetales = new Meteor.Collection 'export_details'
Inventeries = new Meteor.Collection 'inventeries'
InventeryDetails = new Meteor.Collection 'inventery_details'

Transactions = new Meteor.Collection 'transactions'
TransactionDetails = new Meteor.Collection 'transaction_details'

Books = new Meteor.Collection "books"
Lists = new Meteor.Collection "lists"
Todos = new Meteor.Collection "todos"



Meteor.startup ->
  if Lists.find().count() is 0
    data = [
      {
        name: "Meteor Principles"
        contents: [
          [
            "Data on the Wire"
            "Simplicity"
            "Better UX"
            "Fun"
          ]
          [
            "One Language"
            "Simplicity"
            "Fun"
          ]
          [
            "Database Everywhere"
            "Simplicity"
          ]
          [
            "Latency Compensation"
            "Better UX"
          ]
          [
            "Full Stack Reactivity"
            "Better UX"
            "Fun"
          ]
          [
            "Embrace the Ecosystem"
            "Fun"
          ]
          [
            "Simplicity Equals Productivity"
            "Simplicity"
            "Fun"
          ]
        ]
      }
      {
        name: "Languages"
        contents: [
          [
            "Lisp"
            "GC"
          ]
          [
            "C"
            "Linked"
          ]
          [
            "C++"
            "Objects"
            "Linked"
          ]
          [
            "Python"
            "GC"
            "Objects"
          ]
          [
            "Ruby"
            "GC"
            "Objects"
          ]
          [
            "JavaScript"
            "GC"
            "Objects"
          ]
          [
            "Scala"
            "GC"
            "Objects"
          ]
          [
            "Erlang"
            "GC"
          ]
          [
            "6502 Assembly"
            "Linked"
          ]
        ]
      }
      {
        name: "Favorite Scientists"
        contents: [
          [
            "Ada Lovelace"
            "Computer Science"
          ]
          [
            "Grace Hopper"
            "Computer Science"
          ]
          [
            "Marie Curie"
            "Physics"
            "Chemistry"
          ]
          [
            "Carl Friedrich Gauss"
            "Math"
            "Physics"
          ]
          [
            "Nikola Tesla"
            "Physics"
          ]
          [
            "Claude Shannon"
            "Math"
            "Computer Science"
          ]
        ]
      }
    ]

    timestamp = (new Date()).getTime()
    i = 0

    while i < data.length
      list_id = Lists.insert(name: data[i].name)
      j = 0

      while j < data[i].contents.length
        info = data[i].contents[j]
        Todos.insert
          list_id: list_id
          text: info[0]
          timestamp: timestamp
          tags: info.slice(1)

        timestamp += 1
        j++
      i++

  return


