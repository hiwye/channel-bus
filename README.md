# channel-bus

So, you want to bodge together different APIs in real-time with Node.Js?

- State needs to be shared across different components in real-time.
- Components need to react to state changes.
- Components perform actions asynchronously.
- Components need to poll data in regular intervals.

**Then, channel-bus is your perfect companion**. I use it all the time to hook together
Websockets, REST APIs, Arduinos, Joysticks, Websockets and many more things.

## What are channels?
Each channel represents a single concern of your application. Channels can read and write the global state freely
and at any time.  
For example, one channel may be responsible for storing incoming data from a serial port to the global state while
another broadcasts this information to a webhook.

Now, for example, if you also need the information pushed to a REST api, you may simply add another channel for that!

## Example channel

```js
const Channel = require('channel-bus').Channel;

class SampleChannel extends Channel {
    /*
    Assign a user-friendly, descriptive name for this channel.
    */
    get name(){
        return "Sample Channel";
    }

    /*
    Register event listeners, open connections, setup libraries, etc.
    Called once on launch.
     */
    init(){
        //
        this.log("Hello world!")
    }

    /*
    Poll data sources, etc
    Called regularly at the configured interval (if tick is enabled)
     */
    tick(){
        //
    }

    /*
    Push changed state to external services, calculate results, etc.
    Called every time the state object is changed (deeply watched)
     */
    stateChange(){
        //
    }
}

module.exports = SampleChannel;
```

## Example bus

```js
const Bus = require('channel-bus').Bus;

const bus = new Bus();

bus
    // Use this array of channel instances
    .withChannels([
        new (require('./exampleChannel'))
    ])

    // Use the following global config
    .withConfig({
        websocketHost: 'localhost',
        websocketPort: 8080,
    })

    // Enable tick every second
    .enableTick(1000)

    // Initialize with provided global state
    .initWith({
        websocketConnected: false,
        messages: []
    });

```
