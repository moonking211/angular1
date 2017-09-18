#AngularJS Best Practices

##Feature Driven Development
See: http://www.johnpapa.net/angular-growth-structure/

Feature driven development is more about how you organise and structure your application than how you code the functionality. Rather than produce 1 large complicated app you create discreet pieces and couple them together. 

###By type - No
Files organised by type means having your controllers, services, 
filters, directives, views etc. placed in their respective folders. 
Nothing is discrete, development and testing is done in large 
blocks. Large applications quickly become overly complex.

    |
    |- controllers
    |--- controllers.mod.js
    |--- home.ctrl.js
    |--- about.ctrl.js
    |--- contact.ctrl.js
    |--- login.ctrl.js
    |- services
    |--- auth.svc.js

###By Feature - Yes
The application is organised by the self-contained features that it
requires. Each feature can be plugged into or out of the application
with relative ease. It is not baked directly into the application’s
foundations. Both development and testing is conducted within the
scope of each feature.

    |
    |- home
    |--- home.mod.js
    |--- home.ctrl.js
    |- about
    |--- about.mod.js
    |--- about.ctrl.js
    |- contact
    |--- contact.mod.js
    |--- contact.ctrl.js
    |- login
    |--- login.mod.js
    |--- login.ctrl.js
    |--- auth.svc.js

**See the [ngTemplate project](http://grumpywizards.com/ngtemplate) 
for an example of how to organise your application and what each 
directory is used for.**

##Module Declaration
Modules should be declared using the global `angular` variable like so:

    // app module
    angular.module('demo', [
                   'demo.features.login'
    ]);
    
    // sub-module
    angular.module('demo.features.login');

- No additional global variables are required
- You can access your modules from everywhere 
- Modules can be placed into different files
- You can use the function-form of `use strict;`

##Dependency Injection
See: http://docs.angularjs.org/guide/dev_guide.services.managing_dependencies

There are two types of dependencies you can include in your modules 
and controllers. The first is listing your required modules and the
second is injecting services into your controllers.

###Requiring modules

    angular.module('demo', [
                   'demo.features.login
    ])

This is a fairly standard process of how we require modules in AngularJS. 
Naming conventions are covered in the next section but you can see here 
that required modules should be grouped by feature.

###Injecting dependencies

Should be done explicity to prevent errors during minification and disjointed
dependencies within your code.

    .controller('homeCtrl', ['$scope', '$state', function ($scope, $state) { }])

##Naming Conventions
It is important to provide distinct names to components of your 
application. This mitigates the possibility that the angular source,
3rd party libraries and shared components will have clashing module 
names, giving unexpected results.

###Prefixing
All components (directives, controllers, services) must be
prefixed with an identifier that is relevant to their scope:

- if shared across all applications use a company prefix: 'wiz' for Grumpy
Wizards for example.
- if exclusive to an application use an application prefix: 'todo' if
Grumpy Wizards built a todo list app for example.
- *controllers do not need to be prefixed*

###Postfixing
The following component types should be postfixed as per the examples below:

- Controllers: MarkdownCtrl
- Services: wizMarkdownSvc
- Filters: wizMarkdownFltr
- Directives: do not require postfixing wizMarkdown > becomes `wiz-markdown` in markup

###Capitalisation
Controllers are considered classes and as such they should have a leading
capital letter: MarkdownCtrl, all other components should start with lower
case e.g. wizMarkdown.

###Modules
Module namespacing format should following this pattern:

    <application>.<[api,component,feature,service]>.<name>

Examples:
- wiz.service.addNumbers
- todo.component.markdown
- reader.todo.api.email
- users.feature.about

###Filenames
To aid readability in the solution the type of component should be 
appended to each file name, for example:

- dashboard.mod.js  - the module declaration
- dashboard.dir.js – a directive
- dashboard.svc.js – a service or factory
- dashboard.ctrl.js – a controller
- dashboard.flt.js – a filter 
- dashboard.tpl.html – the template
- dashboard.spec.js – the unit tests
- dashboard.spec.conf.js – unit tests config
- dashboard.feature – cucumber specificiation for testing

##HTML Templates and Logic
See: http://docs.angularjs.org/guide/templates

> An Angular template is the declarative specification that, 
along with information from the model and controller, becomes 
the rendered view that a user sees in the browser. It is the 
static DOM, containing HTML, CSS, and angular-specific elements 
and angular-specific element attributes. The Angular elements 
and attributes direct angular to add behaviour and transform 
the template DOM into the dynamic view DOM.

The AngularJS Team

Don't write HTML in your JavaScript *(unless you are building 
a distributable directive where templateUrl won’t function 
correctly, or it’s an abstract state, see routing section)*.

    $scope.errorMsg = "<strong>Validation failed</strong>";
    
Don’t use logic in your HTML templates, for example the 
following should not be done:

    <div class="alert" ng-show="players > 20">Too many players</div>

You should declare a property or method on scope and use that 
to drive your HTML conditions.

Using a declarative approach to logic provides a more maintainable 
template. If we used `players > 20` on multiple HTML elements it 
would create additional overhead if we were to update that 
condition. By encapsulating the logic in a property or method 
it provides both semantically correct mark-up and re-usability.

##Directives
See: http://docs.angularjs.org/guide/directive

Directives are a way to attach a specified behaviour to a DOM 
element or even to transform an element and its children.

###Attributes
When you are decorating an existing element with new
functionality, directives should be applied as attributes.

    <div wiz-mouse-over="move()">Can't touch this</div>

The directive in the example above calls the defined behaviour
when a mouse moves over an element. It is generic, reusable and 
does not change the element beyond the bounds of the mouse event.

These directives should be developed in a generic way, with 
minimal understanding of the element content and can be used across 
an application.

###Elements
When creating self-contained components, you should use the element 
notation. This allows us to describe functionality in templates by 
applying directives as a **domain specific language**.

    <wiz-markdown></wiz-markdown>

Each element is responsible for delivering its described functionality 
and should have ‘replace’ set to true in order to tidy up the html 
after they are compiled.

The parent template is more descriptive and easier to maintain as you 
can simply switch functionality on or off by adding or removing the element.

Element directives should be placed alongside their corresponding feature. 

##Filters
See: http://docs.angularjs.org/guide/filter

Filters should be organised in accordance to their parent features, 
unless they are designed to provide commonly accessible functionality.

###Performance of filters
Angular continuously conducts “dirty-checking”, in essence it is 
looking for changes to values over and over again and raising events 
for $watch and $filter to hook into. If you place a filter on your 
HTML page like so:

    <div ng-bind="item.amount | roundDown"></div>

Don't be surprise if it starts at some point executing A LOT repeatedly.
If you place the above code inside a repeater you are essentially 
increasing the filter execution by a factor of the number of items 
within the repeater’s array.

If possible, you should apply filters to your data before binding to your view

##Services
Services are responsible for the business logic in your application.

UI logic, when to disable a button for example, should not be 
carried out in a service.

**See the [ngTemplate project](http://grumpywizards.com/ngtemplate) for
further info on where to place your business logic.**

##Routers
See: https://github.com/angular-ui/ui-router

###AngularUI Router
All routing should be conducted using AngularUI Router. AngularUI 
Router is an external plugin used to convert your application into
a state machine. ngRoute uses the URL to drive navigation. uiRouter 
reverses your app's relationship with the URL. It uses states to
navigate and it drives changes to the URL rather than the URL driving 
changes to your app.

[Please familiarise yourself with the AngularUI 
Router documentation](https://github.com/angular-ui/ui-router)
