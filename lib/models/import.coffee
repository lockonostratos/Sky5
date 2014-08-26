Schema.add 'imports', class Import
  showImportDetail: -> Schema.importDetails.find({import: @id}).fetch()
