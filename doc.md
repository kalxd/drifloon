---
title: drifloon（v0.6.1）使用手册
author: 荀徒之
documentclass: morelull
numbersections: true
---

# 使用 #

直接引入，得到一个最大模块名——`M`。

```javascript
// @require http://<你的域名>.com/dep/drifloon.dep.<哪个版本>.js

console.log(M);
```

同样可以以`<script>`方式引入。

# 模块介绍 #

M相当于顶层命名空间，包含了以下几个模块。

* 第三方模块
  + R，[ramda][ramda]。
  + Most, [most.js][mostjs]。
  + DOM, [cycle dom][cycle/dom]。
* 内部模块
  + [F]，辅助函数。
  + [Z]，页面元素相关。
  + [V]，虚拟DOM相关。
  + [S]，流相关函数，包括错误处理。
  + [State]，状态管理。
  + [Load]，页面状态。
  + [GX], 暴力猴API再封装。
  + [X]，“其它”模块，无法分类的模块都归于此。

# 更新日志 #

+ 新增:
  - [Z.nodeIndex][nodeIndex]。

# 命名规范 #

在[V]和[Z]模块中出现了同名函数，有的函数名十分相近，此处以[fromClick]做个简要说明：

- [fromClick]，后面不带任何符号，仅仅表示普通的点击事件，原接口返回什么此处也返回什么。
- [fromClick_]，带下划线版本，表示抖动函数，多次点击仅发送最后一次点击事件。
- [fromClickE]，`E`表示Element，返回DOM Element，同理，`V`表示Value，返回用户输入。
- [fromClickE_]，与`fromClick_`同理，表示`fromClickE`抖动版本。

# 内部模块

## F

辅助函数，铺设函数式设施。

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

### isJust ###

```haskell
isJust :: Maybe a -> Bool
```

判断是不是`Nil`。`R.isNil`的反面。

```javascript
F.isJust(0); // true
F.isJust(1); // true
F.isJust({}); // true
F.isJust(null); // false
```

### maybe ###

```haskell
maybe :: b -> (a -> b) -> Maybe a -> b
```

同`haskell`的`maybe`。

```javascript
// f :: Maybe String -> String
const f = maybe("failed", R.toUpper);

f("abc"); // "ABC"
f("hello world"); // "HELLO WORLD"
f(null); // "failed"
```

### maybeOr ###

```haskell
maybeOr :: b -> b -> Maybe a -> b
```

形似三元表达式，前者作用于`Maybe a`，后者作用于`Bool`。

```javascript
// f :: Maybe a -> String
const f = maybeOr("failed", "OK");

f(1); // "OK"
f("hello"); // "OK"
f(null); // "failed"
```

### makeValue

`makeValue`接受一个初始值，返回一个getter/setter函数，我们叫它为`f`好了，它既能获取内部保存的状态，又能设定新状态：直接调用`f()`获取状态；`f(新值)`设定新状态。

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
	return Math.random();
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

`guard`第一个参数表示是否显示，第二个参数是渲染函数，之所以要求是个函数，在于js没有惰性计算，直接接受`View`可能导致意外。如果`View`十分确定，可以使用[only]。

```javascript
// render :: Bool -> View
const render = R.flip(V.guard)(_ => DOM.div("hello"));

render(true); // DOM.div("hello")
render(false); // null
```

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
V.select("ui button", { primary: true }); // .ui.button.primary

V.select("ui button", { primary: false }); // .ui.button
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

### fromAccept ###

```haskell
fromAccept :: Source -> Stream Event
```

### fromAccept_ ###

```haskell
fromAccept_ :: Source -> Stream Event
```

### fromAcceptE ###

```haskell
fromAcceptE :: Source -> Stream Element
```

### fromAcceptE_ ###

```haskell
fromAcceptE_ :: Source -> Stream Element
```

### fromReject ###

```haskell
fromReject :: Source -> Stream Event
```

### fromReject_ ###

```haskell
fromReject_ :: Source -> Stream Event
```

### fromRejectE ###

```haskell
fromRejectE :: Source -> Stream Element
```

### fromRejectE_ ###

```haskell
fromRejectE_ :: Source -> Stream Element
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

### fromClickE

```haskell
fromClickE :: Maybe Element -> Stream Element
```

### fromClickE_

```haskell
fromClickE_ :: Maybe Element -> Stream Element
```

### fromChange

```haskell
fromChange :: Maybe Element -> Stream Event
```

### fromChange_

```haskell
fromChange_ :: Maybe Element -> Stream Event
```

### fromChangeV

```haskell
fromChangeV :: Maybe Element -> Stream String
```

### fromChangeV_

```haskell
fromChangeV_ :: Maybe Element -> Stream String
```

### fromKeydown ###

```haskell
fromKeydown :: Maybe Element -> Stream Event
```

### fromKeydown_ ###

```haskell
fromKeydown_ :: Maybe Element -> Stream Event
```

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
fromKeyupV_ :: Maybe Element -> Stream String
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

在元素的第一个位置创建空`div`。

### blankAtEnd ###

```haskell
blankAtEnd :: Element -> IO Element
```

在元素最后位置创建空`div`。

### blankAtBodyBegin ###

```haskell
blankAtBodyBegin :: () -> IO Element
```

`body`第一个位置创建空`div`。

### blankAtBodyEnd ###

```haskell
blankAtBodyEnd :: () -> IO Element
```

`body`最后一个位置创建空`div`。

### nodeIndex ###

```haskell
nodeIndex :: Element -> IO (Maybe Int)
```

找出该元素的位置。

```html
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
</ul>
```

```javascript
Z.nodeIndex(ul.firstChild) // 0
Z.nodeIndex(ul.lastChild) // 2
Z.nodeIndex(document.creatElement("button")) // null
```

## S ##

流相关的操作。

### create ###

```haskell
create :: (ZenObservable ~> IO a) -> Stream a
```

创建新的观察者。

```javascript
const input$ = S.create(ob => {
	ob.next(1);
	ob.next(2);

	// 可以返回析构函数。
	return () => {
		console.log("clear");
	};
});

input$.observe(console.log);
// 1
// 2
```

### fromCallback ###

```haskell
fromCallback :: (a -> IO ()) -> Stream a
```

从一个普通回调函数中创建观察者。

```javascript
// incCPS :: Int -> (Int -> Int) -> Int
const incCPS = (n, ok) => ok(n + 1);

// input :: [Int]
const input = R.range(1, 5);

const input$ = S.fromCallback(f => {
	input.forEach(n => incCPS(n, f));
});

// 1
// 2
// 3
// 4
```

### init ###

```haskell
init :: a -> Stream (a -> a) -> Stream a
```

初始函数，常用于多处状态更新。

```javascript
const main = source => {
	// update$ :: Stream (a -> a)
	const update$ = intent(source);

	// state$ :: Stream a
	const state$ = update$.thru(S.init(1));
	// ...
};
```

### throwError

```haskell
throwError :: ErrorClass -> String -> Stream a
```

最低层的函数，一般而言不会用到它，除非自行扩展了`Error`。

```javascript
Most.of("wrong")
	.concatMap(S.throwError(Error)))
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
Most.of("wrong").concatMap(S.throwMsg);
// Error: wrong
```

### throwNil

```haskell
throwNil :: ErrorClass -> String -> (Maybe a) -> Stream a
```

检测到空值，就会抛出一个错误。

```javascript
Most.from([1, 2, null]).concatMap(S.throwNil(Error, "wrong"));
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
Most.from([1, 2, null]).concatMap(S.throwNilMsg("wrong"));
// 1
// 2
// Error: wrong
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
        DOM$
    };
};

M.runAt(node, app);
```

先调用`init`初始化状态，得到一个状态实例。
再关注到`DOM$`上面，我们忽辂了`map`参数，而去调用`state.get`获取当前状态。
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

## X ##

“其它”分类。

### Http ###

同源网络请求。

#### compactQuery ####

```haskell
compactQuery :: Url -> Maybe Query -> Url
```

合并url和query。**暂不支持数组。**

```javascript
const url = "http://my.site";

compactQuery(url, {}); // http://my.site
compactQuery(url, {a: 1}); // http://my.site?a=1
```

#### send和send_ ####

```haskell
send :: Url -> FetchOption -> Stream a
send_ :: Url -> Stream a
```

#### json和json_ ####

```haskell
json :: Url -> FetchOption -> Stream JSON
json_ :: Url -> Stream JSON
```

## Load ##

页面状态，包含“请求中”与“请求完成”两种状态，用haskell表示如下：

```haskell
data LoadState a = Loading | Finish a
```

### empty ###

```haskell
empty :: LoadState a
empty = Loading
```

### fmap ###

```haskell
fmap :: (a -> b) -> LoadState a -> LoadState b
```

### pure ###

```haskell
pure :: a -> LoadState a
pure = Finish
```

### ap ###

```haskell
ap :: LoadState (a -> b) -> LoadState a -> LoadState b
```

### bind ###

```haskell
bind :: (a -> LoadState b) -> LoadState a -> LoadState b
```

### or ###

```haskell
or :: a -> LoadState a -> a
```

同`R.defaultTo`。

## GX ##

封装了[Tampermonkey的API](https://www.tampermonkey.net/documentation.php?version=4.10.6105&ext=fire)。

油猴API比较特别，它的接口不定参数居多，接受参数多样化。
为了使用方便，全部都做成柯里化，同个功能会分成多个函数。

类型签名后面紧跟的是必需权限列表。有的接口需要更多权限，需要特别注意。

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

### deleteValue ###

```haskell
deleteValue :: String -> IO ()
```

+ `GM_deleteValue`

删除数据。

### listAllKey ###

```haskell
listAllKey :: () -> IO [String]
```

+ `GM_listValues`

列出已保存所有KEY。

### listAllValue ###

```haskell
listAllValue :: JSON a => () -> IO [a]
```

+ `GM_listValues`

列出已保存所有值。

### clearAllValue ###

```haskell
clearAllValue :: () -> IO ()
```

+ `GM_listValues`
+ `GM_deleteValue`

清空保存数据。

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

### ajax_ ###

```haskell
ajax_ :: Option -> Stream Response
```

请求网络资源。

* `GM_xmlhttpRequest`

### ajax ###

```haskell
ajax :: Option -> Stream String
```

请求网络资源，返回响应体。

* `GM_xmlhttpRequest`

### json_ ###

```haskell
json_ :: Option -> Response
```

请求JSON格式网络资源。

* `GM_xmlhttpRequest`

### json ###

```haskell
json :: JSON a => Option -> Stream a
```

* `GM_xmlhttpRequest`

请求JSON格式网络资源，返回响应体。请求正确，会得到一个json对象。

### setClipboard ###

```haskell
setClipboard :: Option -> IO ()
```

+ GM_setClipboard

复制到系统剪切板。

### setClipboardPlain ###

```haskell
setClipboardPlain :: String -> IO ()
```

+ GM_setClipboard

复制纯文本到剪切板。

### download ###

```haskell
download :: Option -> IO ()
```

+ GM_download

下载文件。

### downloadUrl ###

```haskell
downloadUrl :: String -> String -> IO ()
```

+ GM_download

下载文件。

### notify ###

```haskell
notify :: Option -> Stream Bool
```

+ `GM_notification`

发送通知提醒。

> 返回值为Bool，当用户点击提示窗体关闭时为`true`，点“关闭”关闭提示时为`false`。

### notifyText ###

```haskell
type Title = String
type Content = String

notifyText :: Title -> Content -> IO ()
```

+ GM_notification

发送通知提醒。

### addStyle ###

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

M提供了`runAt`，将整个应用加载到对应的DOM元素上面。与[cycle.js官网上例子][cycle]稍有不同，返回的`sinks`不是`DOM`而是`DOM$`，见下例。

### runAt ###

```haskell
runAt :: Element -> App -> IO ()
```

为了达到统一命名，流的命名后面必须跟`$`，所以返回的视图流都挂载到`DOM$`上。

```javascript
// 随便从页面哪里找来一个元素。
const node = document.querySelector("div");

// cycle.js应用，跟往常写法没有任何不同。
const app = source => {
	// ...

	return {
		// 此处需要注意，是`DOM$`而不是`DOM`！！！
		DOM$
	};
};

M.runAt(node, app);
```

## 模态对话框 ##

如何在cycle.js里弹出对话框呢？或者说平常都是如何弹对话框呢？
垃圾HTML没有模态对话框概念，基本上靠外加一层div实现。大多数网站就是在body最外层添加这么一层遮罩层，对话框就挂载上面展示出来。

一般来说cycle.js应用都会挂载body其它地方，基本上都是与遮罩层分隔两地。cycle.js不如react有个portal，能够随意控制本身之外的元素。
既然无法控制外部无素，为何不再启动新的cycle.js应用，待它完成后返回我们所需的数据？把弹对话框看待成网络请求一般，用响应式写起来并无两样：

```javascript
const http$ = fetch.get("/url")
	.map(..)
;

const dialog$ = dialog.popup("input name")
	.map(..)
;
```

都是等待的过程，而且它们都只带一个值就立刻结束的流。看来我们可以依此实现。

### runModalAt ###

```haskell
runModalAt :: Element -> App -> IO (() -> IO (), Sinks);
```

跟[runAt]差不多，但签名很怪，返回的是一个两元组，第一个是卸载函数（析构函数），第二个是应用返回值。

```javascript
const app = source => {
	const ok$ = V.fromClick(".ok", source);

	return {
		DOM$,
		ok$
	};
};

// dispose即卸载函数（析构函数），调用后会回收整块内容，并将整个node移除。
// sinks即app返回值，即{DOM$, ok$}
const [dispose, sinks] = M.runModalAt(node, app);

// 点击ok，延时卸载
sinks.ok$
	.delay(1000)
	.observe(dispose)
;
```

### execModalAt ###

```haskell
execModalAt :: Element -> App -> IO (Stream a)
```

[runModalAt]简化版，默认响应`accept$`（必需选项）和`reject$`（可选选项），触发后自动调用`dispose`，并返回`accept$`。
适用于一般的对话框，如果涉及过多副作用，可以还得使用[runModalAt]。

```javascript
const app = source => {
	const accept$ = V.fromClick(".accept", source);

	return {
		DOM$,
		accpet$,

		// reject$是可选项，若提供该选项，
		// `execModalAt`会自动订阅掉，整个流就结束了。
	};
};

// 这一条是accept$，所以accept$是必要属性。
M.execModalAt(node, app).drain();
```

[ramda]: https://ramdajs.com/
[mostjs]: https://github.com/cujojs/most
[cycle]: https://cycle.js.org/
[cycle/dom]: https://cycle.js.org/api/dom.html
[cycle/isolate]: https://cycle.js.org/api/isolate.html
[cycle/state]: https://cycle.js.org/api/state.html
