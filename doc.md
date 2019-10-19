---
title: drifloon（v0.4.0）使用手册
author: 荀徒之
documentclass: morelull
numbersections: true
---

# 使用

直接引入，会得到一个最大模块名——M。

```javascript
// @require http://你的域名.com/dep/drifloon.dep.<version>.js

console.log(M);
```

同样可以以`<script>`方式引入。

# 模块介绍

M相当于顶层命名空间，它包含了以下几个模块。

* 第三方模块
  + R，[ramda][ramda]。
  + Rx, [rxjs][rxjs]。
  + Ro, [rxjs/operators][rxjs]。
  + Http, [rxjs/ajax][rxjs]。
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

[fromClick][fromClick]抖动版本。

### fromClickE

```haskell
fromClickE :: Maybe Element -> Stream Element
```

同[fromClick][fromClick]，返回点击元素本身。

### fromClickE_

```haskell
fromClickE_ :: Maybe Element -> Stream Element
```

[fromClickE][fromClickE]抖动版本。

### fromChange

```haskell
fromChange :: Maybe Element -> Stream Event
```

同`fromEvent("change")`。

### fromChange_

```haskell
fromChange_ :: Maybe Element -> Stream Event
```

[fromChange]抖动版本。

### fromChangeV

```haskell
fromChangeV :: Maybe Element -> Stream String
```

同[fromChange][fromChange]，返回用户输入文本，并且`trim()`过一遍。

### fromChangeV_

```haskell
fromChangeV_ :: Maybe Element -> Stream String
```

[fromChangeV][fromChangeV]抖动版本。

### fromHover

```haskell
fromHover :: Maybe Element -> Stream Event
```

同`fromEvent("mouseenter")`。

### fromHover_

```haskell
fromHover_ :: Maybe Element -> Stream Event
```

[fromHover][fromHover]抖动版本。

### fromHoverE

```haskell
fromHoverE :: Maybe Element -> Stream Element
```

同[fromHover][fromHover]，返回元素本身。

### fromHoverE_

```haskell
fromHoverE_ :: Maybe Element -> Stream Element
```

[fromHoverE][fromHoverE]抖动版本。

### fromBlur

```haskell
fromBlur :: Maybe Element -> Stream Event
```

同`fromEvent("mouseleave")`。

### fromBlur_

```haskell
fromBlur_ :: Maybe Element -> Stream Event
```

[fromBlur][fromBlur]抖动版本。

### fromBlurE

```haskell
fromBlurE :: Maybe Element -> Stream Element
```

同[fromBlur][fromBlur]，返回元素本身。

### fromBlurE_

```haskell
fromBlurE_ :: Maybe Element -> Stream Element
```

[fromBlurE][fromBlurE]抖动版本。

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

### info

```haskell
info :: () -> IO Record
```

获取油猴信息。

### getValueOr

```haskell
getValueOr :: JSON a => a -> String -> IO a
```

获取保存的值，第一个参数为默认值。

### getValue

```haskell
getValue :: JSON a => String -> IO (Maybe a)
```

直接取值，不关心有没有保存过数据。

### setValue

```haskell
setValue :: JSON a => String -> a -> IO ()
```

保存数据。

### deleteValue

```haskell
deleteValue :: String -> IO ()
```

删除数据。

### listValue

```haskell
listValue :: JSON a => () -> IO [a]
```

列出所有保存过的数据。

### addStyle

```haskell
addStyle :: String -> IO ()
```

注入样式。

* 样式文本

### injectCSS

```haskell
injectCSS :: String -> IO ()
```

把元数据的css网络文件直接注入到页面。

```javascript
// @resource mycss //path/to/my.css

GM.injectCSS("mycss");
```

# cycle.js

支持cycle.js是这个库的最终目标。

## 运行cycle.js应用

M提供了`runAt`，将整个应用持载到对应的DOM元素上面。

```javascript
// 随便从页面哪里找来一个元素。
const node = document.querySelector("div");

// cycle.js应用，跟往常写法没有任何不同。
const app = source => {...}

M.runAt(node, app);
```

`runAt`同时提供了[cycle state](https://cycle.js.org/api/state.html)，用不到可以不用。

## 模态对话框

html没有这种概念，仅仅是在body上新添一块空白div，把对话框应用塞进去。

### runModal

运行一个模态对话框，应用返回信息必须带有`accept$`和`reject$`。

```javascript
const app = source => {
	return {
		DOM: ...,
		accept$: ...,
		reject$: ...
	};
};

// 用户点击了确认，可以进行下一步。
const accept$ = M.runModal(node, app);
```

如果用户响应了`reject$`，整条流就会真正结束，它不是发送EMPTY流，而且直接`subscribe`。

### execModal

与[runModal][runModal]相似，不同的是，它自动绑定所有`.accept`和`.reject`元素，同时以参数形式传入，它同样必须返回`accept$`和`reject$`。

```javascript
const app = (source, accept$, reject$) => {
	// 这里可以对accept$和reject$进行额外处理。
	return {
		DOM: ...,
		accept$,
		reject$
	};
};

M.execModal(node, app);
```

[ramda]: https://ramdajs.com/
[rxjs]: https://rxjs-dev.firebaseapp.com/
[cycle/dom]: https://cycle.js.org/api/dom.html
[cycle/isolate]: https://cycle.js.org/api/isolate.html
