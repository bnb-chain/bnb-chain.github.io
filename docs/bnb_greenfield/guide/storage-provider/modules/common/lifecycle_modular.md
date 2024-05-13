# Common Abstract Interface

Every service implements Lifecycle and Modular interface. Therefore, we can do a unified lifecycle and resource management through GfSp framework.

## Lifecycle Interface

Lifecycle interface manages the lifecycle of a service and tracks its state changes. It also listens for signals from the process to ensure a graceful shutdown.

Service is an interface for Lifecycle to manage. The component that plans to use Lifecycle needs to implement the following interface:

```go
// Service provides abstract methods to control the lifecycle of a service
// Every service must implement Service interface.
type Service interface {
    // Name describe service name
    Name() string
    // Start a service, this method should be used in non-block form
    Start(ctx context.Context) error
    // Stop a service, this method should be used in non-block form
    Stop(ctx context.Context) error
}

// Lifecycle is an interface to describe how service is managed.
// The Lifecycle tracks the Service lifecycle, listens for signals from
// the process to ensure a graceful shutdown.
//
// All managed services must firstly call RegisterServices to register with Lifecycle.
type Lifecycle interface {
    // RegisterServices registers service to ServiceLifecycle for managing.
    RegisterServices(modular ...Service)
    // StartServices starts all registered services by calling Service.Start method.
    StartServices(ctx context.Context) Lifecycle
    // StopServices stops all registered services by calling Service.Stop method.
    StopServices(ctx context.Context)
    // Signals listens the system signals for gracefully stop the registered services.
    Signals(sigs ...os.Signal) Lifecycle
    // Wait waits the signal for stopping the ServiceLifecycle, before stopping
    // the ServiceLifecycle will call StopServices stops all registered services.
    Wait(ctx context.Context)
}
```

- [Lifecycle Code Snippet](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/lifecycle/lifecycle.go)

## Modular Interface

```go
// Modular is a common interface for submodules that are scheduled by the GfSp framework.
// It inherits lifecycle.Service interface, which is used to manage lifecycle of services. Additionally, Modular is managed
// by ResourceManager, which allows the GfSp framework to reserve and release resources from the Modular resource pool.
type Modular interface {
    lifecycle.Service
    // ReserveResource reserves the resources from Modular resources pool.
    ReserveResource(ctx context.Context, state *rcmgr.ScopeStat) (rcmgr.ResourceScopeSpan, error)
    // ReleaseResource releases the resources to Modular resources pool.
    ReleaseResource(ctx context.Context, scope rcmgr.ResourceScopeSpan)
}
```

- [Modular Code Snippet](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/modular.go)

## Limit

Limit is an interface that that specifies basic resource limits.

```go
type Limit interface {
    // GetMemoryLimit returns the (current) memory limit.
    GetMemoryLimit() int64
    // GetFDLimit returns the file descriptor limit.
    GetFDLimit() int
    // GetConnLimit returns the connection limit, for inbound or outbound connections.
    GetConnLimit(Direction) int
    // GetConnTotalLimit returns the total connection limit.
    GetConnTotalLimit() int
    // GetTaskLimit returns the task limit, for high, medium and low priority tasks.
    GetTaskLimit(ReserveTaskPriority) int
    // GetTaskTotalLimit returns the total task limit.
    GetTaskTotalLimit() int
    ScopeStat() *ScopeStat
    // NotLess returns an indicator whether cover the param limit fields.
    NotLess(Limit) bool
    // Add params limits fields value to self.
    Add(Limit)
    // Sub params limits fields value to self.
    Sub(Limit) bool
    // Equal returns an indicator whether equal the param limit.
    Equal(Limit) bool
    // String returns the Limit state string.
    String() string
}
```
