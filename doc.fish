#!/usr/bin/env fish

# 版本号
set PKG_VERSION (cat package.json | jq ".version" | tr -d "\"" | tr -d "\r")

set_color yellow; and echo 开始制作drifloon-{$PKG_VERSION}.pdf……

pandoc --pdf-engine xelatex doc.md --toc -o dist/drifloon-{$PKG_VERSION}.pdf

set_color -o green; and echo "制作完成！"
