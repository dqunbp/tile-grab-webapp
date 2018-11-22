if [ -z "$1" ]
  then
    echo "Please specify host in first arg"
    echo "For example:"
    echo "  ~$ build-app.sh http://my.host[:4000]"
  else
    docker build -t tile-grabber-webapp-builder:latest .
    docker run --rm -v $(pwd)/build:/app/build -v $(pwd)/src:/app/src -e REACT_APP_HOST=$1 tile-grabber-webapp-builder
fi
