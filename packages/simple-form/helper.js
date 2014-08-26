processClass = function(optionsHash) {
  if (!optionsHash) {
    return
  }
  if (optionsHash['class']) {
    html_class = " " + optionsHash['class']
  } else {
    html_class = ""
  }
  return html_class
}

processRequired = function(optionHash) {
  if (optionHash['required']) {
    return " required"
  } else {
    return ""
  }
}

processId = function(optionsHash) {
  if (!optionsHash) {
    return
  }
  if (optionsHash['id']) {
    return " id='" + optionsHash['id'] + "'";
  } else {
    return ""
  }
}

processPlaceHolder = function(optionsHash) {
  if (optionsHash['placeholder']) {
    placeholder = " placeholder='" + optionsHash['placeholder'] + "' "
  } else {
    placeholder = ""
  }
  return placeholder
}

processLabel = function(optionsHash, field) {
  if (_.isString(optionsHash['label'])) {
    label_words = optionsHash['label']
  } else {
    label_words = _.humanize(field)
  }
  return label_words
}

buildLabel = function(optionsHash, field) {
  if (optionsHash['label'] === false) {
    return ''
  } else {
    label_words = processLabel(optionsHash, field)
    return "<label for='"+ field +"'>" + label_words + "</label>"
  }
}

buildHintBlock = function(optionsHash) {
  if (optionsHash['hint']) {
    hintBlock = "<span class='help-block'>" + optionsHash['hint'] + "</span>";
  } else {
    hintBlock = "";
  }
  return hintBlock;
}

buildBeforeAddon = function(optionsHash) {
  addon = ""
  if (optionsHash['before'] || optionsHash['after']) {
    addon = "<div class='input-group'>"
    if (optionsHash['before']) {
      addon = addon + "<span class='input-group-addon'>" + optionsHash['before'] + "</span>"
    }
  }
  return addon
}

buildAfterAddon = function(optionsHash) {
  addon = ""
  if (optionsHash['before'] || optionsHash['after']) {
    if (optionsHash['after']) {
      addon = "<span class='input-group-addon'>" + optionsHash['after'] + "</span>"
    }
    addon = addon + "</div>"
  }
  return addon
}

processForBelongsTo = function(field, object) {
  name = object.constructor.name
  if (!window[name]) {
    return false
  }
  isAssociation = _.contains(_.pluck(window[name].belongs_to, 'name'), field)
  if (isAssociation) {
    associations = window[_.classify(field)].all()
    var array = [];
    _.each(associations, function(association) {
      array.push({value: association._id, name: association.name})
    })
    return array
  } else {
    return false
  }
}

processForHaBTM = function(field, object) {
  name = object.constructor.name
  if (!window[name]) {
    return false
  }
  isAssociation = _.contains(_.pluck(window[name].has_and_belongs_to_many, 'name'), field)
  if (isAssociation) {
    associations = window[_.classify(_.singularize(field))].all()
    var array = [];
    _.each(associations, function(association) {
      array.push({value: association._id, name: association.name})
    })
    return array
  } else {
    return false
  }
}

buildAssociationCheckboxes = function(field, object, checkboxes, options) {
  return false
  builtCheckboxes = _.map(checkboxes, function(checkbox) {
    html_class = processClass(options.hash)
    checked = _.contains(object[_.singularize(field) + '_ids'], checkbox.value) === true ? ' checked' : '';
    label = processLabel(options.hash, checkbox.name)
    html = "<label for='"+ checkbox.name +"'><input id='"+ checkbox.name +"' name='" + checkbox.name + "' type='hidden' value='false'><input name='" + checkbox.name + "' class='"+ html_class +"' type='checkbox' value='" + checkbox.value + "' " + checked + ">" + label + "</label>";
    return html;
  });
  return new Spacebars.SafeString(builtCheckboxes.join(' '));
}

/*----- HELPERS ------*/

UI.registerHelper('text_field', function(field, options){
  var _this = this;
  if (!field) {
    return;
  }
  value = _this[field] || ""
  html_class = processClass(options.hash)
  type = options.hash['type'] || "text"
  if (value && type === "date" && value.constructor === Date) {
    value = value.getFullYear() + '-' + ('0' + (value.getMonth()+1)).slice(-2) + "-" + ('0' + value.getDate()).slice(-2)
  }
  placeholder = processPlaceHolder(options.hash)
  required = processRequired(options.hash)
  html = "<input type='"+ type +"' id='" + field + "' name='"+ field +"' value='"+ value +"' class='form-control"+ html_class +"'"+ placeholder + required + " >"
  label = buildLabel(options.hash, field)
  hint = buildHintBlock(options.hash)
  beforeAddon = buildBeforeAddon(options.hash)
  afterAddon = buildAfterAddon(options.hash)
  return new Spacebars.SafeString(label + beforeAddon + html + afterAddon + hint);
});

UI.registerHelper('text_area', function(field, options){
  var _this = this;
  if (!field) {
    return;
  }
  value = _this[field] || ""
  html_class = processClass(options.hash)
  if (options.hash['rows']) {
    rows = "rows='"+ options.hash['rows'] +"' "
  } else {
    rows = ""
  }

  required = processRequired(options.hash)
  html = "<textarea id='" + field + "' "+ rows +"name='"+ field +"' class='form-control"+ html_class +"'" + required + ">"+ value +"</textarea>"
  label = buildLabel(options.hash, field)
  hint = buildHintBlock(options.hash)
  return new Spacebars.SafeString(label + html + hint);
});

UI.registerHelper('select_box', function(field, options) {
  _this = this;
  optionsValues = undefined
  if (!field) {
    return;
  }

  associationOptions = processForBelongsTo(field, _this)
  html_class = processClass(options.hash)

  if (associationOptions) {
    optionsValues = associationOptions
    dbField = field + "_id"
  } else {
    dbField = field
    if (options.hash.optionValues && options.hash.optionValues.length > 0) {
      optionsValues = options.hash.optionValues
    } else {
      optionsValues = _this["" + field + "Options"]();
    }
  }

  required = processRequired(options.hash)
  html_options = [];
  _.each(optionsValues, function(option) {
    name = option.name || _.humanize(option)
    value = option.value || option
    selected = _this[field] === value ? ' selected' : '';
    return html_options.push("<option value='" + value + "'" + selected + ">" + name + "</option>");
  });
  html = "<select class='form-control" + html_class + "' name='" + dbField + "'" + required + ">" + (html_options.join('')) + "</select>"
  label = buildLabel(options.hash, dbField)
  hint = buildHintBlock(options.hash)
  return new Spacebars.SafeString(label + html + hint);
});


UI.registerHelper('check_box', function(field, options) {
  var capitalizedField, checked;
  if (!field) {
    return;
  }
  associationOptions = null//processForHaBTM(field, this)
  if (associationOptions) {
    return buildAssociationCheckboxes(field, this, associationOptions, options)
  } else {
    html_class = processClass(options.hash)
    checked = this[field] === 'true' ? ' checked' : '';
    label = processLabel(options.hash, field)
    required = processRequired(options.hash)
    html = "<label for='"+ field +"'><input id='"+ field +"' name='" + field + "' type='hidden' value='false'><input name='" + field + "' class='"+ html_class +"' type='checkbox' value='true' " + checked + required + ">" + label + "</label>";
    hint = buildHintBlock(options.hash)
    return new Spacebars.SafeString(html + hint);
  }
});

UI.registerHelper('file_field', function(){
  if (Package['uploader']) {
    this.settings = {
      name: this.field,
      onUpload: function(error, result) {
        if (result) {
          $('input[name="'+ this.name +'Url"').val(result.url)
          $('input[name="'+ this.name +'OriginalFileName"').val(result.originalFileName)
          Session.set(this.name + 'OriginalFileName', result.originalFileName)
          Session.set(this.name + 'Url', result.url)
        } else {
          console.log(error)
        }
      }
    }
    return Template['simpleFormFileField']
  }
});

UI.registerHelper('submit_button', function(text, options){
  var _this = this;
  if (!text && !options) {
    options = {};
  }
  if (text && text.hash) {
    options = text;
    text = undefined;
  }
  klass = _this.constructor.name;
  if (_this._id) {
    actionWord = "Update "
  } else {
    actionWord = "Add "
  }
  value = text || actionWord + klass;
  html_class = processClass(options.hash);
  html_id = processId(options.hash);
  if (options.hash && options.hash['button']) {
    html = "<button type='submit' class='btn btn-default"+ html_class + "'"+ html_id +">" + value + "</button>";
  } else {
    html = "<input type='submit' value='"+ value +"' class='btn btn-default"+ html_class + "'"+ html_id +">";
  }
  return new Spacebars.SafeString(html);
});
