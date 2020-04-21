const Bus = require('../index').Bus;

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
