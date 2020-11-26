

## React Hooks: Not magic, just Arrays

### useState

1.最简单的 useState 用法是这样的:

```javascript
function Counter() {
  var [count, setCount] = useState(0);

  return (
    <div>
      <div>{count}</div>
      <Button onClick={() => { setCount(count + 1); }}>
        点击
      </Button>
    </div>
  );
}
```

2.基于 useState 的用法，我们尝试着自己实现一个 useState：

```js
function useState(initialValue) {
  var state = initialValue;
  function setState(newState) {
    state = newState;
    render();
  }
  return [state, setState];
}
```

3.这时我们发现，点击 Button 的时候，count 并不会变化，为什么呢？**我们没有存储 state，每次渲染 Counter 组件的时候，state 都是新重置的。**

自然我们就能想到，把 state 提取出来，存在 useState 外面。

```javascript
var _state; // 把 state 存储在外面
function useState(initialValue) {
  _state = _state || initialValue; // 如果没有 _state，说明是第一次执行，把 initialValue 复制给它
  function setState(newState) {
    _state = newState;
    render();
  }
  return [_state, setState];
}
```

### useEffect

------

useEffect 是另外一个基础的 Hook,用来处理副作用,最简单的用法是这样的:

```javascript
 useEffect(() => {
    console.log(count);
 }, [count]);
```

我们知道 useEffect 有几个特点：

1. 有两个参数 callback 和 dependencies 数组
2. 如果 dependencies 不存在，那么 callback 每次 render 都会执行
3. 如果 dependencies 存在，只有当它发生了变化， callback 才会执行
   我们来实现一个 useEffect

```javascript
let _deps; // _deps 记录 useEffect 上一次的 依赖

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray; // 如果 dependencies 不存在
  const hasChangedDeps = _deps
    ? !depArray.every((el, i) => el === _deps[i]) // 两次的 dependencies 是否完全相等
    : true;
  /* 如果 dependencies 不存在，或者 dependencies 有变化*/
  if (hasNoDeps || hasChangedDeps) {
    callback();
    _deps = depArray;
  }
}
```

此时我们应该可以解答一个问题：

**Q：为什么第二个参数是空数组，相当于 componentDidMount ？**

**A：因为依赖一直不变化，callback 不会二次执行。**

到现在为止，我们已经实现了可以工作的 useState 和 useEffect。但是有一个很大的问题：它俩都只能使用一次，因为只有一个 \_state 和 一个 \_deps。比如

```javascript
const [count, setCount] = useState(0);
const [username, setUsername] = useState('fan');
```

count 和 username 永远是相等的，因为他们共用了一个 \_state，并没有地方能分别存储两个值。我们需要可以存储多个 \_state 和 \_deps。

如 《React hooks: not magic, just arrays》所写，我们可以使用数组，来解决 Hooks 的复用问题。
代码关键在于：

1. 初次渲染的时候，按照 useState，useEffect 的顺序，把 state，deps 等按顺序塞到 memoizedState 数组中。
2. 更新的时候，按照顺序，从 memoizedState 中把上次记录的值拿出来。
3. 如果还是不清楚，可以看下面的图。

```javascript
let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}
```

1.初始化

![image-20201125145735613](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201125145735613.png)

2.初次渲染

![image-20201125145818913](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201125145818913.png)

3.事件触发

![image-20201125145913398](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201125145913398.png)

4.Re Render

![image-20201125145927546](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201125145927546.png)

到这里，我们实现了一个可以任意复用的 useState 和 useEffect。

同时，也可以解答几个问题：

**Q：为什么只能在函数最外层调用 Hook？为什么不要在循环、条件判断或者子函数中调用。**

**A：memoizedState 数组是按 hook定义的顺序来放置数据的，如果 hook 顺序变化，memoizedState 并不会感知到。**

**Q：自定义的 Hook 是如何影响使用它的函数组件的？**

**A：共享同一个 memoizedState，共享同一个顺序。**

**Q：“Capture Value” 特性是如何产生的？**

**A：每一次 ReRender 的时候，都是重新去执行函数组件了，对于之前已经执行过的函数组件，并不会做任何操作。**

## 真正的 React 实现

虽然我们用数组基本实现了一个可用的 Hooks，了解了 Hooks 的原理，但在 React 中，实现方式却有一些差异的。

React 中是通过类似单链表的形式来代替数组的。通过 next 按顺序串联所有的 hook。

```
type Hooks = {
	memoizedState: any, // 指向当前渲染节点 Fiber
  baseState: any, // 初始化 initialState， 已经每次 dispatch 之后 newState
  baseUpdate: Update<any> | null,// 当前需要更新的 Update ，每次更新完之后，会赋值上一个 update，方便 react 在渲染错误的边缘，数据回溯
  queue: UpdateQueue<any> | null,// UpdateQueue 通过
  next: Hook | null, // link 到下一个 hooks，通过 next 串联每一 hooks
}
 
type Effect = {
  tag: HookEffectTag, // effectTag 标记当前 hook 作用在 life-cycles 的哪一个阶段
  create: () => mixed, // 初始化 callback
  destroy: (() => mixed) | null, // 卸载 callback
  deps: Array<mixed> | null,
  next: Effect, // 同上 
};
```

memoizedState，cursor 是存在哪里的？如何和每个函数组件一一对应的？

我们知道，react 会生成一棵组件树（或Fiber 单链表），树中每个节点对应了一个组件，hooks 的数据就作为组件的一个信息，存储在这些节点上，伴随组件一起出生，一起死亡。

![image-20201125145701713](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201125145701713.png)