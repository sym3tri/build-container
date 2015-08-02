# Build Container Demo

A working demo of how to isolate build dependencies and run front-end build processes via a container.
Doing so has the following benefits:

- No need to rely on NPM
- No need to vendor your `node_modules` directory
- No inconsistent Node versions across developer machines
- No more READMEs saying "first install node, then install x, then install y..."
- Easy consistent CI setup

## Getting Started

### OSX and Windows

- install [boot2docker](http://boot2docker.io/)
- run `boot2docker up`
- follow instructions regarding environment variables
- launch the container and run any command within it: `./builder [CMD]`
  i.e. `./builder gulp`

### Linux

- install [docker](https://docs.docker.com/installation/)
- launch the container and run any command within it: `./builder [CMD]`
  i.e. `./builder gulp`

## Run the Demo App

First build the assets:
```
./builder gulp
```

Then launch your favorite static file webserver from the `./public` and open your browser.

i.e.
```
./builder gulp
cd public
python -m SimpleHTTPServer 8080
```
...then browse to http://localhost:8080


## Rebuilding the build container

```
docker build -f builder-dockerfile .
```
