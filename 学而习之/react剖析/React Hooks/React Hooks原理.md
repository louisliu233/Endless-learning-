## React Hooks: Not magic, just Arrays

### useState

1.最简单的 useState 用法是这样的:

```
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

```
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

```
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

useEffect 是另外一个基础的 Hook,用来处理副作用,最简单的用法是这样的:

```
 useEffect(() => {
    console.log(count);
 }, [count]);
```

我们知道 useEffect 有几个特点：

1. 有两个参数 callback 和 dependencies 数组
2. 如果 dependencies 不存在，那么 callback 每次 render 都会执行
3. 如果 dependencies 存在，只有当它发生了变化， callback 才会执行
   我们来实现一个 useEffect

```
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

```
const [count, setCount] = useState(0);
const [username, setUsername] = useState('fan');
```

count 和 username 永远是相等的，因为他们共用了一个 \_state，并没有地方能分别存储两个值。我们需要可以存储多个 \_state 和 \_deps。

如 《React hooks: not magic, just arrays》所写，我们可以使用数组，来解决 Hooks 的复用问题。
代码关键在于：

1. 初次渲染的时候，按照 useState，useEffect 的顺序，把 state，deps 等按顺序塞到 memoizedState 数组中。
2. 更新的时候，按照顺序，从 memoizedState 中把上次记录的值拿出来。
3. 如果还是不清楚，可以看下面的图。

```
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
