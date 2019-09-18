---
title: drifloon使用手册
author: 荀徒之
documentclass: morelull
---

# 主要模块介绍

* 第三方模块
  + R，[ramda][ramda]。
  + Rx, [rxjs][rxjs]。
  + Ro, [rxjs][rxjs]。
  + DOM, [cycle dom][cycle/dom]。
  + I, [cycle isolate][cycle/isolate]。
* 内部模块
  + F，辅助函数。
  + E，页面元素相关。
  + GM, 暴力猴API再封装。

# 内部模块

## F

### fmap

```haskell
fmap :: (a -> b) -> Maybe a -> Maybe b
```

### fmap2

```haskell
fmap2 :: (a -> b -> c) -> Maybe a -> Maybe b -> Maybe c
```

### fmap3

```haskell
fmap3 :: (a -> b -> c -> d) -> Maybe a -> Maybe b -> Maybe c -> Maybe d
```

### fmap4

```haskell
fmap4 :: (a -> b -> c -> d -> e) -> Maybe a -> Maybe b -> Maybe c -> Maybe d -> Maybe e
```

### fmap5

```haskell
fmap5 :: (a -> b -> c -> d -> e -> f) -> Maybe a -> Maybe b -> Maybe c -> Maybe d -> Maybe e -> Maybe f
```

### makeValue

`makeValue`接受一个初始值，返回一个getter/setter函数，可以用新函数赋于新值，也可以用它得到内部的值。

```javascript
const value = makeValue("blue");

const printColor = () => {
	// 得到内部存储的值。
	const color = value();
	console.log(color);
};

printColor(); // blue

value("green");
printColor(); // green

value("red");
printColor(); // red
```

### genValue

`genValue`接受一个初始函数，同[makeValue][makeValue]一样返回getter/settter，初始函数仅在第一次调用getter时调用。

  ```javascript
  const value = genValue(() => {
	  console.log("done!");
	  return 1;
  });

  value(); // 输出done!，返回1。
  value(); // 不输出done!，返回1。
  ```

## E

### fromEvent

```haskell
fromEvent :: String -> Maybe Element -> Stream Event
```

接受事件名称，绑定的元素，返回新的流；如果元素不存在，将返回NEVER。

### fromClick

```haskell
fromClick :: Maybe Element -> Stream Event
```

同`fromEvent("click")`。

### fromClick_

```haskell
fromClick_ :: Maybe Element -> Stream Event
```

[fromClick][fromClick]节流版本。

### fromClickE

```haskell
fromClickE :: Maybe Element -> Stream Element
```

同[fromClick][fromClick]，返回点击元素本身。

### fromClickE_

```haskell
fromClickE_ :: Maybe Element -> Stream Element
```

[fromClickE][fromClickE]节流版本。

### fromChange

```haskell
fromChange :: Maybe Element -> Stream Event
```

同`fromEvent("change")`。

### fromChange_

```haskell
fromChange_ :: Maybe Element -> Stream Event
```

[fromChange]节流版本。

### fromChangeV

```haskell
fromChangeV :: Maybe Element -> Stream String
```

同[fromChange][fromChange]，返回用户输入文本，并且`trim()`过一遍。

### fromChangeV_

```haskell
fromChangeV_ :: Maybe Element -> Stream String
```

[fromChangeV][fromChangeV]节流版本。

### fromHover

```haskell
fromHover :: Maybe Element -> Stream Event
```

同`fromEvent("mouseenter")`。

### fromHover_

```haskell
fromHover_ :: Maybe Element -> Stream Event
```

[fromHover][fromHover]节流版本。

### fromHoverE

```haskell
fromHoverE :: Maybe Element -> Stream Element
```

同[fromHover][fromHover]，返回元素本身。

### fromHoverE_

```haskell
fromHoverE_ :: Maybe Element -> Stream Element
```

[fromHoverE][fromHoverE]节流版本。

### fromBlur

```haskell
fromBlur :: Maybe Element -> Stream Event
```

同`fromEvent("mouseleave")`。

### fromBlur_

```haskell
fromBlur_ :: Maybe Element -> Stream Event
```

[fromBlur][fromBlur]节流版本。

### fromBlurE

```haskell
fromBlurE :: Maybe Element -> Stream Element
```

同[fromBlur][fromBlur]，返回元素本身。

### fromBlurE_

```haskell
fromBlurE_ :: Maybe Element -> Stream Element
```

[fromBlurE][fromBlurE]节流版本。

### createEmptyNode

```haskel
createEmptyNode :: () -> IO Element
```

创建空div，并插入到body。

### createEmptyNodeWith

```haskell
createEmptyNodeWith :: String -> IO Element
```

与[createEmptyNode][createEmptyNode]类似，但可以接受样式类名。

## GM

油猴API比较特别，它提供的接口默认都是不定参数居多，而且它接受参数多样化。为了方便使用，全部改成定参形式，对于原本不同参数表示不同意义的函数，拆分成多个同意函数。

另外，星号版本表示无参数。

### info*

> 获取油猴信息。

### getValueOr

> 获取保存的值。

* 默认值，尚未保存过数据，将返回该值。
* key。

### getValue

> 直接取值，不关心有没有保存过数据。

* key

### setValue

> 保存数据。

* key
* 保存的数据

### deleteValue

> 删除数据

* key

### listValues*

> 列出所有保存过的数据。

### getResourceText

> 获取元数据资源。

* 资源名称

### getResourceUrl

> 获取元数据URL。

* 资源名称

### addStyle

> 注入样式。

* 样式文本

### openInTabWith

> 新标签打开。

* [选项](https://violentmonkey.github.io/api/gm/#gm_openintab)
* 地址

### openInTab

> 后台打开地址。

* 地址

### notificationWith

> 提醒。

* [选项](https://violentmonkey.github.io/api/gm/#gm_notification)

### notification

> 提醒。

* 标题
* 文本

### injectCSS

> 把元数据的css网络文件直接注入到页面。

* 名称

```javascript
// @resource mycss //path/to/my.css

GM.injectCSS("mycss");
```

[ramda]: https://ramdajs.com/
[rxjs]: https://rxjs-dev.firebaseapp.com/
[cycle/dom]: https://cycle.js.org/api/dom.html
[cycle/isolate]: https://cycle.js.org/api/isolate.html
