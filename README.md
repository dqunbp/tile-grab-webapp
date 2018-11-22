#Tile-grabber frontend

## Build app

Prepare build docker image

```bash
$ docker build -t tile-grabber-webapp-builder:latest .
```

Build app

```bash
$ docker run --rm -v $(pwd):/app -e REACT_APP_HOST=<APP-HOST> tile-grabber-webapp-builder
```
