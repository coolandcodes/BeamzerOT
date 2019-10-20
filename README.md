# BeamzerOT
Operational Transformation Library for Beamzer. 

## Intro
This library helps app developers setup **Collaborative Editing** quickly and easily in their JavaScript-based / Java-based apps. It is based off on [this pioneer project](https://github.com/Operational-Transformation/ot.js).

## Example

```js


const beam = new BeamzerClient({
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

const connect = new Beamzer.ot.ConnectAdapter( 
    '@charles', // '@charles' can also be replace with a browser-fingerprint
    new Beamzer.ot.EventSourceServerAdapter(
        beam, 
        null
    ), 
    {}
);

const editor = new Beamzer.ot.CodeMirrorAdapter(

);

const otClient = new Beamzer.ot.EditorClient(
   0, // revision
   {
      '@henrianan':{
         name: "Henry Ananaba", 
         selection: null
      }, 
      '@abufk': {
         name: "Feyikemi Abudu",
         selection: null
      }
   },
   connect,
   editor
)

```

## License
MIT
