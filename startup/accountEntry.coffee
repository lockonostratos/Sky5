T9n.language = "vi"
Meteor.startup ->
  AccountsEntry.config
    homeRoute: '/'
    dashboardRoute: '/'
    extraSignUpFields: [
      {field: "companyName", label: 'Tên doanh nghiệp', required: true }
    ]