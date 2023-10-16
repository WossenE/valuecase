#!/bin/bash
set -e

if [[ ! `command -v markdown-to-html` ]]; then
  echo "❌ Error: You need to install the following tool:"
  echo "https://www.npmjs.com/package/markdown-to-html-cli"
  exit 1
fi

#MARKDOWN_FILES=$(find . -type f -not -path '*/node_modules/*' -not -path "*/.templates/*" -name "*.md")
MARKDOWN_FILES=$(find . -type f -not -path '*/node_modules/*' -name "*.md")
declare -a ALL_OUTPUTS

for CURRENT_FILE in $MARKDOWN_FILES
do
  echo "⏳ Converting: $CURRENT_FILE ..."
  HTML_PATH=${CURRENT_FILE//.md/.html}
  markdown-to-html -s "$CURRENT_FILE" -o "$HTML_PATH"

  ALL_OUTPUTS+=("$HTML_PATH")

  echo "✅ Converted: $HTML_PATH"
  echo ""
done

echo ""
echo "–––––––"
echo ""
echo "Adjusting links in HTML files 🔗"
echo ""

INDEX=0
for ORIGINAL_FILE in $MARKDOWN_FILES
do
  HTML_FILE_TO_ADJUST=${ALL_OUTPUTS[$INDEX]}

  INDEX_TWO=0
  for MARKDOWN_SOURCE in $MARKDOWN_FILES
  do
    HTML_OUTPUT=${ALL_OUTPUTS[INDEX_TWO]}

    A=$(basename "$MARKDOWN_SOURCE")
    B=$(basename "$HTML_OUTPUT")
    sed -i'.mdtohtmloriginal' -e "s,$A,$B,g" "$HTML_FILE_TO_ADJUST"

    let INDEX_TWO=${INDEX_TWO}+1
  done

  let INDEX=${INDEX}+1
done

echo ""
echo "🏁 Script finished."
echo ""