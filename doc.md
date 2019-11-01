---
title: drifloon（v0.4.6）使用手册
author: 荀徒之
documentclass: morelull
numbersections: true
---

# 使用

直接引入，会得到一个最大模块名——M。

```javascript
// @require http://<你的域名>.com/dep/drifloon.dep.<哪个版本>.js

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
  + [State]，状态管理。
  + [GM], 暴力猴API再封装。

# 更新日志 #

+ 不兼容改动：
  - `Z`模块下删除命名不准确函数：`blankBefore`、`blankAfter`、`blankAfterBody`、`blankBeforeBody`，分别改为[blankAtBegin]、[blankAtEnd]、[blankAtBodyBegin]、[blankAtBodyEnd]。

+ 新增：
  - [State]模块。

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

`genValue`接受一个初始函数`f`，返回同[makeValue]同性质的getter/setter。使用getter时，如果内部状态为`Nil`，便会调用`f`生产新状态，并保存下来。

初始默认状态即为`Nil`。

```javascript
const value = genValue(() => {
	console.log("done!");
	Math.random();
});

value();
// done!
// 0.8292609950388922

value();
// 0.8292609950388922

value(null);
value();
// done!
// 0.171352363719799
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

### blankAtBegin ###

```haskell
blankAtBegin :: Element -> IO Element
```

在这个元素的第一个位置创建空`div`。

### blankAtEnd ###

```haskell
blankAtEnd :: Element -> IO Element
```

在这个元素最后面创建空`div`。

### blankAtBodyBegin ###

```haskell
blankAtBodyBegin :: () -> IO Element
```

`body`最开始创建空`div`。

### blankAtBodyEnd ###

```haskell
blankAtBodyEnd :: () -> IO Element
```

`body`最后创建空`div`。

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


## State ##

状态没有使用[cycle/state][cycle/state]，原因有二：其一，使用复杂；其二，只限制在cycle.js应用内，无法在其他地方使用。
考虑以上原因，重新制作了不够纯的状态管理，不仅能在cycle.js中使用，普通的应用也能使用。

### 计数器 ###

在cycle.js中使用：

```javascript
const state = State.init(1);

const app = source => {
    const up$ = V.fromClick(".up", source);
    const down$ = V.fromClick(".down", source);

    up$.observe(_ => state.modify(R.inc));
    down$.observe(_ => state.modify(R.dec));

    const DOM$ = state.stream$
        .map(_ => DOM.div([
            DOM.button(".up", "+1"),
            DOM.label(state.get()),
            DOM.button(".down", "-1")
        ]))
    ;

    return {
        DOM: DOM$
    };
};

M.runAt(node, app);
```

我们先调用`init`初始化状态，再关注到`DOM$`上面，我们并没有使用`map`的参数，而是调用`state.get`获取当前状态。
同时`up$`和`down$`也是直接调用`state.modify`更改状态。

这种用法好处显而易见，无论何时何地都可以任意取值与赋值，不像[state][cycle/state]那样麻烦，同时不限于在cycle.js内，任何应用都能使用。

### init ###

初始状态，初始后获取State的一个实例。

```javascript
const state = State.init(1);

// state就是State一个实例，之后就能调用它的put、get、modify方法。
```

### stream$ ###

[State]实例成员，每次调用`put`之后会发送新状态。

### put ###

更新状态。

```javascript
const state = State.init(1);

state.stream$.observe(console.log);
// 1

state.put(2);
// 输出2

state.put(3);
// 输出3
```

### get ###

获得当前状态。

```javascript
const state = State.init(1);

state.get(); // 1

state.put(2);
state.put(3);

state.get(); // 3
```

### modify ###

接受一个修改状态的高阶函数，相当于：

```javascript
const modify = f => put(f(get()));
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

[cycle/state]: https://cycle.js.org/api/state.html
