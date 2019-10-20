# BeamzerOT
Operational Transformation Library for Beamzer. 

## Intro
This library helps app developers setup **Collaborative Editing** quickly and easily in their JavaScript-based / Java-based apps. It is based off on [this pioneer project](https://github.com/Operational-Transformation/ot.js).

## Example

```js


var beam = new BeamzerClient({
   source:"https://service.beamzer.co/hub",
   params:{
      topic:"activity/stream"
   },
   options: { crossdomain: true }
});

beam.start(
    function onOpen () {

    }, 
    function onError () {

    },
    function onMessage () {

    }
)

new Beamzer.ot.ConnectAdapter(
    '/ot', 
    '@charles', 
    new Beamzer.ot.EventSourceServerAdapter(
        beam, 
        null
    ), 
    {}
);


```

## License
MIT
