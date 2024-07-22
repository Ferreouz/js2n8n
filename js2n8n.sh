#!/usr/bin/env bash
if [[ -z $js2n8njs_bin ]]
then
    js2n8njs_bin="$(pwd)/index.js"
fi

copy="/usr/bin/xsel --input --clipboard"

# $js2n8njs_bin > out.json
$js2n8njs_bin | $copy