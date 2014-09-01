# metro-ui2

[Metro UI CSS 2](http://metroui.org.ua/) packaged for [MeteorJS](http://meteor.com).

## History

### v2.0.32

* Updated for Meteor 0.9.0 Unipackage system.
* Synchronized package version with Metro UI CSS version.
* Updated for [Metro UI CSS](https://github.com/olton/Metro-UI-CSS) v2.0.32.

See [History](history.md) for more information on prior releases.

## Usage

For the most part, once installed, you can use the markup samples provided
on the [Metro UI CSS 2](http://metroui.org.ua/) website. Make sure that you wrap
your markup in an outer DIV tag with the appropriate class tag (see below).

```
<body>
  <div class="metro">
      {{> template}}
  </div>
</body>
```

The dynamic behavior for the Metro UI components (like drop-downs) needs to be initialized
in the Meteor template render method to work correctly. The following demonstrates how
to initialize all components for the entire page using the default body template in Meteor.

```
UI.body.rendered = function() {
  $.Metro.initAll();
}
```

This however would not be very performant. Each of the initialization methods can 
be passed a jQuery selector to limit the scope of DOM elements that will be traversed. I recommend
wrapping each of your templates in an outer container with an ID that matches the template name. This
makes it easy to initialize only the components used within that template being rendered:

```
Template.header.rendered = function() {
  $.Metro.initAll("#header");
}
```

This still however runs more code than required. Although it requires some extra work, initializing
only the components being used in a particular template is the most performant, and recommended method:

```
Template.header.rendered = function() {
  $.Metro.initDropdowns("#header");
  $.Metro.initButtonSets("#header");
}
```

The following is the complete list of initialization methods. These methods can be found in the **metro-initiator.js**
source file included in the Metro UI download.

- $.Metro.initAccordions(area);
- $.Metro.initButtonSets(area);
- $.Metro.initCalendars(area);
- $.Metro.initCarousels(area);
- $.Metro.initCountdowns(area);
- $.Metro.initDatepickers(area);
- $.Metro.initDropdowns(area);
- $.Metro.initFluentMenus(area);
- $.Metro.initHints(area);
- $.Metro.initInputs(area);
- $.Metro.transformInputs(area);
- $.Metro.initListViews(area);
- $.Metro.initLives(area);
- $.Metro.initProgreeBars(area);
- $.Metro.initRatings(area);
- $.Metro.initScrolls(area);
- $.Metro.initSliders(area);
- $.Metro.initTabs(area);
- $.Metro.initTimes(area);
- $.Metro.initTrees(area);
- $.Metro.initSteppers(area);
- $.Metro.initStreamers(area);
- $.Metro.initDragTiles(area);
- $.Metro.initPulls(area);
- $.Metro.initPanels(area);
- $.Metro.initTileTransform(area);

## License

[The MIT License (MIT)](license.md)
