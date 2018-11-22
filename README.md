# Tile-grabber webapp

## Build app

Prepare build docker image

Run `build-app.sh` with hostname arg

```bash
$ ./build-app.sh http://example.host[:4000]
```

Or build manually with commands

```bash
$ docker build -t tile-grabber-webapp-builder:latest .
$ docker run --rm -v $(pwd)/build:/app/build -v $(pwd)/src:/app/src -e REACT_APP_HOST=<APP-HOST> tile-grabber-webapp-builder
```
