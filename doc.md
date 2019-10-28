---
title: drifloon（v0.4.2）使用手册
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
  + Most, [most.js][mostjs]。
  + DOM, [cycle dom][cycle/dom]。
* 内部模块
  + [F]，辅助函数。
  + [Z]，页面元素相关。
  + [V]，虚拟DOM相关。
  + [S]，流相关函数，包括错误处理。
  + [Http]，网络请求。
  + [GM], 暴力猴API再封装。

# 更新日志 #

*该版本与0.4.1不兼容。*

*若没有大改动，将发布第一个稳定版。*

原`N`模块拆分成两个模块——`Z`和`V`，前者处理真实DOM元素，后者处理虚拟DOM元素。

+ 删除`createEmtpyNode`和`createEmptyNodeWith`，代替为[blankBefore]、[blankAfter]、[blankAfterBody]、[blankBeforebody]。

+ 添加[S.init][init]。

# 内部模块

## F

纯函数集合，不言自明的函数。

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

### traverse ###

```haskell
traverse :: (a -> Maybe b) -> [a] -> Maybe [b]
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

## V

虚拟DOM相关函数，与cycle.js搭配使用。

### guard ###

```haskell
guard :: Bool -> (() -> View) -> Maybe View
```

`guard`第一个参数表示是否显示，第二个参数是渲染函数，之所以要求是个函数，在于js没有惰性计算，直接接受`View`可能导致意外错误。如果`View`十分确定，可以使用[only]。

### only ###

```haskell
only :: Bool -> View -> Maybe View
```

[guard]特殊版。

### select ###

```haskell
select :: String -> Record -> String
```

选择需要的css类。

```javascript
N.select("ui button", { primary: true }); // .ui.button.primary

N.select("ui button", { primary: false }); // .ui.button
```

### select_ ###

```haskell
select_ :: Record -> String
```

```javascript
const select_ = select("");
```

### fromEvent ###

```haskell
fromEvent :: String -> Selector -> Source -> Stream Event
```

低层次函数，一般较少使用，它是`source.DOM.select("selector").events("click")`的再一封装。

### fromClick ###

```haskell
fromClick :: Selector -> Source -> Stream Event
```

### fromClick_ ###

```haskell
fromClick_ :: Selector -> Source -> Stream Event
```

### fromClickE ###

```haskell
fromClickE :: Selector -> Source -> Stream Element
```

### fromClickE_ ###

```haskell
fromClickE_ :: Selector -> Source -> Stream Element
```

### fromChange ###

```haskell
fromChange :: Selector -> Source -> Stream Event
```

### fromChange_ ###

```haskell
fromChange_ :: Selector -> Source -> Stream Event
```

### fromChangeV ###

```haskell
fromChangeV :: Selector -> Source -> Stream String
```

### fromChangeV_ ###

```haskell
fromChangeV_ :: Selector -> Source -> Stream String
```

### fromKeydown ###

```haskell
fromKeydown :: Selector -> Source -> Stream Event
```

### fromKeydown_ ###

```haskell
fromKeydown_ :: Selector -> Source -> Stream Event
```

### fromKeydownV ###

```haskell
fromKeydownV :: Selector -> Source -> Stream String
```

### fromKeydownV_ ###

```haskell
fromKeydownV_ :: Selector -> Source -> Stream String
```

### fromKeyup ###

```haskell
fromKeyup :: Selector -> Source -> Stream Event
```

### fromKeyup_ ###

```haskell
fromKeyup_ :: Selector -> Source -> Stream Event
```

### fromKeyupV ###

```haskell
fromKeyupV :: Selector -> Source -> Stream String
```

### fromKeyupV_ ###

```haskell
fromKeyupV_ :: Selector -> Source -> Stream String
```

### fromEnterPress ###

```haskell
fromEnterPress :: Selector -> Source -> Stream Event
```

### fromEnterPress_ ###

```haskell
fromEnterPress_ :: Selector -> Source -> Stream Event
```

### fromEnterPressV ###

```haskell
fromEnterPressV :: Selector -> Source -> Stream String
```

### fromEnterPressV_ ###

```haskell
fromEnterPressV_ :: Selector -> Source -> Stream String
```

## Z ##

真实DOM元素处理，不用cycle.js前提下，可以使用该模块。

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

### fromKeydown ###

```haskell
fromKeydown :: Maybe Element -> Stream Event
```

同`fromEvent("keydown")`。

### fromKeydown_ ###

```haskell
fromKeydown_ :: Maybe Element -> Stream Event
```

[fromKeydown]抖动版。

### fromKeydownV ###

```haskell
fromKeydownV :: Maybe Element -> Stream String
```

### fromKeydownV_ ###

```haskell
fromKeydownV_ :: Maybe Element -> Stream String
```

### fromKeyup ###

```haskell
fromKeyup :: Maybe Element -> Stream Event
```

同`fromEvent(keyup)`。

### fromKeyup_ ###

```haskell
fromKeyup_ :: Maybe Element -> Stream Event
```

### fromKeyupV ###

```haskell
fromKeyupV :: Maybe Element -> Stream String
```

### fromKeyupV_ ###

```haskell
fromKeyupV_ :: MaybeElement -> Stream String
```

### fromEnterPress ###

```haskell
fromEnterPress :: Maybe Element -> Stream Event
```

按下回车才触发。

### fromEnterPress_ ###

```haskell
fromEnterPress_ :: Maybe Element -> Stream Event
```

### fromEnterPressV ###

```haskell
fromEnterPressV :: Maybe Element -> Stream String
```

### fromEnterPressV_ ###

```haskell
fromEnterPressV_ :: Maybe Element -> Stream String
```

### blankAfter ###

```haskel
blankAfter :: Element -> IO Element
```

在一个元素后面创建空div。

### blankBefore ###

```haskell
blankBefore :: Element -> IO Element
```

在一个元素前面创建空div。

### blankAfterbody ###

```haskell
blankAfterBody :: () -> IO Element
```

[blankAfter]特别版。

### blankBeforeBody ###

```haskell
blankBeforeBody :: () -> IO Element
```

[blankBefore]特别版。

## S ##

流相关的操作。

### throwError

```haskell
throwError :: ErrorClass -> String -> Stream a
```

最低层的函数，一般而言不会用到它，除非自行扩展了`Error`。

```javascript
Most.of("wrong")
	.concatMap(E.throwError(Error)))
	.subscribe(..)
;
// Error: wrong
```

### throwMsg

```haskell
throwMsg :: String -> Stream a
```

[throwError][throwError]另一个形式，第一个参数默认为`Error`。

```haskell
Most.of("wrong").concatMap(E.throwMsg);
// Error: wrong
```

### throwNil

```haskell
throwNil :: ErrorClass -> String -> (Maybe a) -> Stream a
```

检测到空值，就会抛出一个错误。

```javascript
Most.from([1, 2, null]).concatMap(E.throwNil(Error, "wrong"));
// 1
// 2
// Error: wrong
```

### throwNilMsg

```haskell
throwNilMsg :: String -> (Maybe a) -> Stream a
```

与[throwMsg][throwMsg]相类，第一个参数默认为`Error`。

```javascript
Most.from([1, 2, null]).concatMap(E.throwNilMsg("wrong"));
// 1
// 2
// Error: wrong
```

### init ###

```haskell
init :: a -> Stream (a -> a) -> Stream a
```

初始函数，常用于cycle.js。

```javascript
const main = source => {
	// update$带的是(a -> a)函数，对状态进行更新。
	const update$ = intent(source);

	const state$ = update$.thru(S.init(1));
	// ...
};
```

## Http ##

网络请求，只能请求同源资源。有跨域需求，请使用[GM]的[ajax]或[json]。

### send ###

```haskell
send :: Url -> Option -> Stream a
```

`window.fetch`再封装，参数一致。

### json ###

```haskell
json :: JSON a => Url -> Option -> Stream
```

[send]再封装，自动返回json。

### get ###

```haskell
get :: JSON a => Url -> Query -> Stream a
get_ :: JSON a => Url -> Stream
```

### post ###

```haskell
post :: JSON a => Url -> Body -> Stream a
post_ :: JSON a => Url -> Stream
```

### put ###

```haskell
put :: JSON a => Url -> Body -> Stream a
put_ :: JSON a => Url -> Stream a
```

### patch ###

```haskell
patch :: JSON a => Url -> Body -> Stream a
patch_ :: JSON a => Url -> Stream
```

### del ###

```haskell
del :: JSON a => Url -> Query -> Stream a
del_ :: JSON a => Url -> Stream a
```

## GM

油猴API比较特别，它提供的接口默认都是不定参数居多，而且它接受参数多样化。
为了方便使用，全部以柯里化形式提供，同个功能函数会分成多个函数。

类型签名后面紧跟的是所需的权限提示。有的接口需要更多权限，需要特别注意。

### info

```haskell
info :: () -> IO Record
```

+ `GM_info`

获取油猴信息。

### getValueOr

```haskell
getValueOr :: JSON a => a -> String -> IO a
```

+ `GM_getValue`

获取保存的值，第一个参数为默认值。

### getValue

```haskell
getValue :: JSON a => String -> IO (Maybe a)
```

+ `GM_getValue`

直接取值，不关心有没有保存过数据。

### setValue

```haskell
setValue :: JSON a => String -> a -> IO ()
```

+ `GM_setValue`

保存数据。

### deleteValue

```haskell
deleteValue :: String -> IO ()
```

+ `GM_deleteValue`

删除数据。

### listValue

```haskell
listValue :: JSON a => () -> IO [a]
```

+ `GM_listValues`

列出所有保存过的数据。

### getResourceText ###

```haskell
getResourceText :: String -> IO (Maybe String)
```

+ `GM_getResourceText`

获取资源的源内容。

### getResourceUrl ###

```haskell
getResourceUrl :: String -> IO (Maybe String)
```

+ `GM_getResourceUrl`

获取资源的blob地址。

### ajax ###

```haskell
ajax :: Option -> Stream a
```

请求网络资源。

### json ###

```haskell
json :: JSON a => Option -> Stream a
```

请求网络资源，并解析成json。

### addStyle

```haskell
addStyle :: String -> Stream String
```

+ `GM_addStyle`

注入样式，需要注意它返回的是一条流。

### injectCSS

```haskell
injectCSS :: String -> Stream String
```

+ `GM_getResourceText`
+ `GM_addStyle`

把元数据的css网络文件直接注入到页面。

```javascript
// @resource mycss //path/to/my.css

GM.injectCSS("mycss");
```

# cycle.js

支持cycle.js是这个库的最终目标。

## 运行cycle.js应用

M提供了`runAt`，将整个应用加载到对应的DOM元素上面。

```javascript
// 随便从页面哪里找来一个元素。
const node = document.querySelector("div");

// cycle.js应用，跟往常写法没有任何不同。
const app = source => {...}

M.runAt(node, app);
```

[ramda]: https://ramdajs.com/
[mostjs]: https://github.com/cujojs/most
[cycle/dom]: https://cycle.js.org/api/dom.html
[cycle/isolate]: https://cycle.js.org/api/isolate.html
