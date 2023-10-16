#!/bin/bash

# –––––––––––––––––––––––––––––––––––––––––––––––––––
#
# You want to remove or add a new option?
#
# Sure, just change
#  - (a) the array marked by the comment 'HERE-1'
#  - (b) the select options marked by the comment 'HERE-2'
#  - and (c) adjust the option min/max marked by the comment 'HERE-3' (min = 1, max = number of options).
#
# –––––––––––––––––––––––––––––––––––––––––––––––––––

set -e

OUT_DIR="backend"

# HERE-1
TEMPLATE_DIRS=(".templates/backend/express-prisma" ".templates/backend/nestjs-typeorm")

# HERE-3
OPTION_MIN=1
OPTION_MAX=2

echo ""
echo "Welcome! Please choose a backend template 🏋️"
echo ""

if [[ -d "$OUT_DIR" ]]; then
  echo ""
  echo "Looks like you already chose a template 🤔"
  echo "The project already exists: $OUT_DIR"
  echo ""

  read -p "Do you want to override the existing project with a fresh template? [y/N]: " yn

  case $yn in
  	[yY] ) echo ""; echo "Okay, let's proceed 🙂"; echo "";;
  	* ) echo ""; echo "Exiting."; exit;;
  esac
fi

CHOSEN_TEMPLATE_NAME=
CHOSEN_TEMPLATE_NUMBER=
CHOSEN_TEMPLATE_DIR=

echo "––––––––"
echo ""
PS3="Choose a backend template ($OPTION_MIN - $OPTION_MAX): "

# HERE-2
select template in "💡 Express + 🔼 Prisma" "🦁 NestJS + 🧱 TypeORM"
do
  if [[ $REPLY -lt $OPTION_MIN ]] || [[ $REPLY -gt $OPTION_MAX ]]
  then
    echo "❌ Please choose a number between $OPTION_MIN and $OPTION_MAX"
    echo ""
  else
    CHOSEN_TEMPLATE_NAME=$template
    CHOSEN_TEMPLATE_NUMBER=$REPLY
    CHOSEN_TEMPLATE_DIR=${TEMPLATE_DIRS[$(($CHOSEN_TEMPLATE_NUMBER - 1))]}
    break
  fi
done

echo ""
echo "⚙️ Setting up $CHOSEN_TEMPLATE_NAME ..."
echo ""

echo "🔎 Copying template from: ${CHOSEN_TEMPLATE_DIR}"
echo "💾 Pasting to: $OUT_DIR"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"
cp -a "$CHOSEN_TEMPLATE_DIR/." "$OUT_DIR"
echo ""

if [[ -f "$OUT_DIR/package.json" ]]; then
  echo "⏬ Installing dependencies ..."

  if [[ -n $(command -v yarn) ]]; then
    echo "  -> using yarn 🧶"
    echo ""
    yarn --cwd "$OUT_DIR"
  elif [[ -n $(command -v npm) ]]; then
    echo "  -> using npm 👵"
    echo ""
    npm install --prefix "$OUT_DIR"
  else
    echo "🚨 ERROR: Neither yarn nor npm are available!"
  fi

  echo ""
  echo "✅ Dependencies installed"
else
  echo "🧐 Found no package.json in $OUT_DIR ... can't install dependencies automatically."
fi
echo ""

echo "🏁 Script finished."
echo ""

