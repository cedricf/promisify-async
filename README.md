# promisify-async

Takes a request with async response triggere from a different tread and using a correlation id turns it into a Promise

## Require promisify-async

```
const PromisifyAsync = require('promisify-async');
const promisifyAsync = new PromisifyAsync();
```

## Simple example

Here is a simple example where we resolve the responses at random time intervals (This would normally be done with an async handler)
[./example/example.js](./example/example.js))

## Make Request and Response Messages into a Promise

We can make a Promise from request/response messages in the case where I send a message to another service and need to wait for the response. The response is handled in a different thread, but by making it a Promise we can handle thie much more easily.

Firstly, we need to send the message

```
const PromisifyAsync = require('promisify-async');
const promisifyAsync = new PromisifyAsync(); // You must resolve to this instance of promisifyAsync


const uuid = require('uuid');

const correlationId = uuid.v1();
aTopic.publish(Message.send([msg, correlationId), msgAttributes);

promisifyAsync.createPromise(correlationId).then( (response) => {
  // process response message
});

```

Now we need to handle the response message

```
public onMessageReceived(message: any): void {
      try {
        // get the correllationId from the message and resolve on the same instance of the promisifyAsync withthe mssage data
        promisifyAsync.resolveForCorrelationId(correlationId, message.data);
      message.ack();
    } catch (error) {
      // handle any errors
    }
}
```

## Promise all

If you need to wait for multiple responses then you can use Promise.all()

Create a prommise for each request/response and add them to an array

```
const allPromises = [];
allPromises.push(promisifyAsync.createPromise(correlationId1));
allPromises.push(promisifyAsync.createPromise(correlationId1));
```

Promise.all(allPromises).then( (responses) => {
// process the array of responses
});
