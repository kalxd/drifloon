# drifloon #

专为油猴脚本制作的依赖库，集成[cycle.js][cycle.js]和[ramda.js][ramda]，在此基础上扩展出更多方便书写代码的函数，详见doc.md。

# 安装依赖 #

node肯定少不了。

```bash
$ npm install
```

# 编译 #

需要webpack环境，版本应该没什么要求。

```bash
$ webpack
```

# 使用 #

编译之后只会到一个打包完整的大文件，输出目录在`dist/`，放到任意静态服务上就能使用。

# 生成文档 #

这里有个脚本可以生成pdf格式的文档。前提必须安装fish shell及[morelull][morelull]。

```bash
$ ./doc.fish
```


[ramda]: https://github.com/ramda/ramda
[cycle.js]: https://github.com/cyclejs
[morelull]: https://github.com/kalxd/morelull
