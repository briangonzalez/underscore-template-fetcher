#!/bin/sh
# stash unstaged changes, run grunt task, stage release updates and restore stashed files

NAME=$(git branch | grep '*' | sed 's/* //')

echo "Running pre-push hook on: " $NAME

# don't run on rebase
if [ $NAME != '(no branch)' ]
then
  git stash -q --keep-index
  grunt

  RETVAL=$?

  if [ $RETVAL -ne 0 ]
  then
    exit 1
  fi

  git add .
  git stash pop -q

  if [ $RETVAL -ne 0 ]
    echo "Popped staged changes."
  then
    echo "Nothing to pop."
  fi  

fi