#!/usr/bin/env sh

set -e

while :;
do
    case "$1" in
        "--skip-tests" )
          SKIP_TESTS=true
          shift;;
        "--push" )
          PUSH=true
          shift;;
        *)
          break;;
   esac
done


PARENT_BRANCH=$1

shift

for CURRENT in $*; do

  git checkout $CURRENT
  git pull origin $CURRENT
  git merge --no-edit $PARENT_BRANCH

  if [ "$SKIP_TESTS" != "true" ]
  then
    pnpm install
    pnpm nx run-many -t component-test,test
  fi

  PARENT_BRANCH="$CURRENT"

done

if [ "$PUSH" = "true" ]
then
  git push --all
fi
