# drifloon #
![npm](https://img.shields.io/npm/v/drifloon?color=brightgreen&label=npm)
[![LICENSE](https://img.shields.io/badge/LICENSE-AGPL%20v3-blue)](https://www.gnu.org/licenses/agpl-3.0.en.html)
![drifloon testing](https://github.com/kalxd/drifloon/workflows/drifloon%20testing/badge.svg)
![drifloon publish](https://github.com/kalxd/drifloon/workflows/drifloon%20publish/badge.svg)

![drifloon](https://media.52poke.com/wiki/archive/e/eb/20140413170939%21425Drifloon.png)

该项目既像类库（提供能单独使用的工具函数），又有一套框架（基于流式的[cycle.js][cycle.js]），她更像是能够快速开发油猴脚本的方案。

内部提供非常多的函数用于交互DOM；又集成了[cycle.js][cycle.js]，编写复杂的界面也不在话下。

整个方案都围绕**函数式**，我们并不排斥副作用，我们关心的是如何将它们隔离。更多用法与例子，参见[文档](./doc.md)。

# 编译、发布 #

代码都在当前`node LTS`下运行、编译。项目中并未使用到什么新颖特性，为安全起见，最好能使用相同版本node。

## 安装依赖 ##

```bash
$ npm install
```

## 编译 ##

```bash
$ npm run build
```

顺利之后，在`dist/`中就能看到对应版本的目标文件，格式为`drifloon.{version}.js`，`{version}`即是`package.json`中的version。

## 发布、使用 ##

编译后得到就是一整个依赖库。可以像普通的js文件一样，托管到静态服务，通过浏览器就能直接访问。

部署完成后，进行油猴管理界面（不同扩展用法不同），新建脚本，并添加几行：

```javascript
// @require http:://你的静态服务地址/drifloon.{版本}.js

// 以下正文
const { F } = M;

// ...
```

一切顺利就能得么整个模块`M`，之后就能愉快地写脚本了。

# typescript #

不打算提供typescript支持，或更换成typescript，最核心的理由就是ts不支持柯里化，[rambda][rambda]提供的`curry`函数，最终还是生成各种`any`类型，与其如此，不如直接用js。

# 作为依赖库 #

已在[npm](https://www.npmjs.com/package/drifloon)发布，可以通过npm安装正常使用。

**需要注意，不要使用`GX`模块，该模块封装了油猴`GM_*`，除非运行于油猴环境中。**

```javascript
const { F } = require("drifloon");

// ...
```

# 生成文档 #

这里有个脚本可以生成pdf格式的文档。前提必须安装fish shell及[morelull][morelull]。

```bash
$ ./doc.fish
```

# 运行测试 #

```bash
$ npm run test
```

[rambda]: https://github.com/selfrefactor/rambda
[cycle.js]: https://github.com/cyclejs
[morelull]: https://github.com/kalxd/morelull
