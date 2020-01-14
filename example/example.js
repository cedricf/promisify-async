const PromisifyAsync = require('../promisify-async');

const promisifyAsync = new PromisifyAsync();

//  Here we create a whole lot of promises to wait for responses
let all_correlationIds = [];
let all_promises = [];
for (i = 0; i < 10; ++i) {
  all_correlationIds.push(i);
  all_promises.push(
    promisifyAsync.createPromise(i).then(value => {
      console.log(`Received response: "${value}"`);
      return value;
    })
  );
}

// Now every second randomly resolve the promise
timer = setInterval(() => {
  if (all_correlationIds.length != 0) {
    // find a random correlationId from the map
    let idx = Math.floor(Math.random() * all_correlationIds.length);
    let correlationId = all_correlationIds[idx];
    all_correlationIds.splice(idx, 1);
    console.log();
    console.log(`Randomly chose correlationId: ${correlationId}`);

    // Let's resolve a promise based on a correlation Id
    promisifyAsync.resolveForCorrelationId(
      correlationId,
      'Response: ' + correlationId
    );
  } else {
    console.log('Done.');
    clearInterval(timer);
  }
}, 1000);

// Wait for all promises to resolve before processing
Promise.all(all_promises).then(responses => {
  responses.forEach(response => {
    console.log(response);
  });
});