#!/bin/bash -e
#
# USAGE:
#
# With env vars:
#   MYVAR=foo OTHERVAR=bar DOCKER_ENV=MYVAR,OTHERVAR ./builder ./my-script --my-script-arg1 --my-script-arg2
#
# Without env vars:
#   ./builder ./my-script --my-script-arg1 --my-script-arg2

source builder-env

# forward whitelisted env variables to docker
ENV_STR=""
for VAR in ${DOCKER_ENV//,/ }; do
    ENV_STR="$ENV_STR -e $VAR=${!VAR}"
done

CMD=$@
echo "running with docker, might take a while to pull the image..."
docker run $ENV_STR --rm --net=host -v `pwd`:/go/src/${PROJECT_REPO} -w /go/src/$PROJECT_REPO $BUILDER_IMAGE /bin/bash -c "./builder-linkdirs && $CMD"

# clean up symlink
rm node_modules || :
