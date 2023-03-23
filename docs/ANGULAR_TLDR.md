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

