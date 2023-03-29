# Angular tl;dr

Basic elements:

- Components
  - Selector (component identifier)
- Templates (associated with components one-to-one)
  - Bound attributes/properties (`[type]="classProperty"`)
  - Event listeners (`(eventName)="classMethod"`)
  - Directives (`*directiveName="value"`)
- Dependency injection
  - Services are marked as injectable
  - Services are requested by the components
  - Angular instantiates the service and injects it into the component

The `ng generate component foo` generates the component files and also 
updates the module registration information in `src/app/app.modules.ts` file.
The module registration information includes routing information which can 
be edited to quickly add routes for navigating to various components. The 
route registration uses an express-like `/path/:param` format. Note that the 
component's selector is always prefixed with `app-`. This is done 
automatically by the code generator, and there is no need to do it manually.

All angular components are registered using the the `declarations` key in 
the `NgModule` options. The `selector` key in the component options is used 
to match the custom tag to the component.

The "app" component (which sites in the root of the `src/app` directory) is 
registered as the bootstrap component. This component also provides the main 
layout for the page, and contains the router output. The router is 
responsible for outputting the correct component based on the routing table.

Angular supports two-way communication. The downwards communication is 
performed using props, like in other MVVM frameworks. The props are declared 
on the child component using the `@Input()` decorator with an interface. E.g.:

```typescript
@Component({
  selector: 'app-foo',
  template: 'app-foo.template.html',
}) class AppFooComponent {
  @Input() myProp!: IMyProp;
}
```

They are bound using the standard binding syntax: `[myProp]="some.val"`.

The upwards communication (child-to-parent) is done using event emitters, which 
are provided by the parent. The events are handled using event listener bindings 
the same way as native events: `(myEvent)="onMyEvent()"`.

The `ngOnInit()` method, if defined, is called when the component is 
initialized, before its children are rendered. When using the routing, this 
method is used to get the relevant route parameters and perform action based 
on that.

Angular supports the pipe syntax in templates which provides formatting 
features. For example, `{{ product.price | currency }}`. In particular, the 
`async` pipe allows usage of async objects such as RxJS observables and 
promises as if they were sync. For instance, 
`*ngFor="let foo of promise | async"`.

Services are classes that can be injected into components using Angular's 
dependency injection framework. They are generated just like components, 
using the `ng generate service foo` command. Services live in the `src/app` 
directory are imported into components and used as a type signature in the 
constructor. For instance:

```typescript
import { FooService } from '../foo.service';

@Component({
  selector: 'app-foo',
  template: './app-foo.template.html',
}) class FooComponent {
  constructor(private fooService: FooService) {}
}
```

Note that even though we are using the service as a type signature only, we 
are still needing to import it, so there is still a hard dependency on the 
service module itself. It is unclear to me whether this is actually how DI 
is supposed to work (probably not). Since part of this exercise is to write 
**idiomatic** code, I'm going to stick to how it's described in the 
documentation and just make a mental note of this issue. Writing tests may 
reveal something I'm not seeing right now, but I'm not going to bother with 
tests in this exercise, we'll never know. :)

Angular comes with its own HTTP client. 
