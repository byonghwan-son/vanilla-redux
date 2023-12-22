# Recoil Todo

### atom
상태값을 저장하는 최소 단위

### useRecoilState
useState 와 동일하게 상태 값을 관리

### useSetRecoilState
상태값 변경 전용 함수를 리턴함.
```javascript
const setTodoList = useSetRecoilState(todoListState);

const addItem = () => {
  setTodoList((oldList) => 
    [...oldList,
      {
        id: Date.now(),
        text: inputValue,
        isComplete: false,
      },
    ]
  );
}
```

### selector

파생된 상태(derived state)의 일부.  
파생되었다는 것은 기존에 상태가 이미 주어져 있다는 뜻.  
이 상태는 어떠한 목적을 가지고 변경을 하거나 추출해서 새로이 파생시킨 상태로 만들게 된다.    
파생된 상태는 어떤 방법으로든 주어진 상태를 수정하는 순수 함수로 
전달되어진 상태가 만들어 낸 결과물로 생각할 수 있다.  
파생된다는 것은 다른 데이터에 의존해서 새롭게 생성한 동적인 데이터를 리턴하게 되는 것을 말한다.  

```text
필터링 된 todo 리스트 : 전체 todo 리스트에서 일부 기준에 따라 
특정 항목이 필터링 된 새 리스트(예: 이미 완료된 항목 필터링)가 생성되어 파생된다.  

  => 필터의 기준이 저장될 수 있는 상태가 필요하다.

Todo 리스트 통계 : 전체 todo 리스트에서 목록의 총 항목 수, 완료된 항목 수, 
완료된 항목의 백분율 같은 리스트의 유용한 속성들을 계산하여 파생된다.
```

`filteredTodoListState` 는 내부적으로 2개의 의존성 상태를 가짐.  
`todoListFilterState`, `todoListState` 의 값 중에 하나라도 변경되면  
`filteredTodoListState`는 재 실행된다.

```javascript
// 팔터링된 todo 리스트
import {selector} from "recoil";
import {todoListState} from "./atoms";

export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ( {get}) => {
    // get 함수는 recoil state 를 가져올 수 있다.
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  }
})
```

### useRecoilValue

```javascript
import React from 'react';
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import {useRecoilValue} from "recoil";
import TodoListFilters from "./TodoListFilters";
import {filteredTodoListState} from "../states/selectors";
import TodoListStats from "./TodoListStats";

function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator/>
      <ul>
        {todoList.map(todoItem =>
          <TodoItem key={todoItem.id} item={todoItem}/>)}
      </ul>
    </>
  );
}

export default TodoList;
```

## 비동기 데이터 쿼리

### Synchronous Example (동기 예제)

```javascript
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
});

const currentUserNameState = selector({
  key: 'CurrentUserName',
  get: ({get}) => {
    return tableOfUsers[get(currentUserIDState)].name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameState);
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <CurrentUserInfo />
    </RecoilRoot>
  );
}
```

## Asynchronous Example (비동기 예제)
```javascript
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: 1,
});

const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: async ({get}) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    return response.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameQuery);
  return <div>{userName}</div>;
}
```

React Suspense 와 함께 동작하도록 디자인 되어 있음.

```javascript
function MyApp() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CurrentUserInfo />
      </React.Suspense>
    </RecoilRoot>
  );
}
```

## Error Handling (에러 처리하기)

리액트가 지원하는 `<ErrorBoundary>`로 잡을 수 있음.

```javascript
const currentUserNameQuery = selector({
  key: 'CurrentUserName',
  get: async ({get}) => {
    const response = await myDBQuery({
      userID: get(currentUserIDState),
    });
    if (response.error) {
      throw response.error;
    }
    return response.name;
  },
});

function CurrentUserInfo() {
  const userName = useRecoilValue(currentUserNameQuery);
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```

## Queries with Parameters (매개변수가 있는 쿼리)

매개변수를 기반으로 쿼리를 하고 싶을 때 `selectorFamily`를 사용함.

```javascript
const userNameQuery = selectorFamily({
  key: 'UserName',
  get: (userID) => async () => {
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response.name;
  },
});

function UserInfo({userID}) {
  const userName = useRecoilValue(userNameQuery(userID));
  return <div>{userName}</div>;
}

function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <UserInfo userID={1} />
          <UserInfo userID={2} />
          <UserInfo userID={3} />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```

## Data-Flow Graph

하나의 유저가 다수의 친구가 있을 경우 친구는 또 다른 친구와 연결된다.  
마치 데이터 노드가 서로 연결된 Graph 와 동일한 형태를 가지게 됨.  

```javascript
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: null,
});

const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get: (userID) => async () => {
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

const currentUserInfoQuery = selector({
  key: 'CurrentUserInfoQuery',
  get: ({get}) => get(userInfoQuery(get(currentUserIDState))),
});

const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    return friendList.map((friendID) => get(userInfoQuery(friendID)));
  },
});

function CurrentUserInfo() {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);
  const setCurrentUserID = useSetRecoilState(currentUserIDState);
  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => setCurrentUserID(friend.id)}>
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MyApp() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
```

## Concurrent Requests (동시 요청)

`waitForAll`과 `waitForNone` 을 사용해서 병렬로 쿼리 결과를 기다리게 됨.  

`waitForAll`은 모든 데이터를 병렬로 받아올 때까지 기다리게 됨.  
```javascript
const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    const friends = get(
      waitForAll(friendList.map((friendID) => userInfoQuery(friendID))),
    );
    return friends;
  },
});
```

`waitForNone`은 리턴되는 일부 데이터로 추가적인 UI 업데이트를 할 수 있음.
```javascript
const friendsInfoQuery = selector({
  key: 'FriendsInfoQuery',
  get: ({get}) => {
    const {friendList} = get(currentUserInfoQuery);
    const friendLoadables = get(
      waitForNone(friendList.map((friendID) => userInfoQuery(friendID))),
    );
    return friendLoadables
      .filter(({state}) => state === 'hasValue')
      .map(({contents}) => contents);
  },
});
```

## Pre-Fetching (미리 가져오기)

성능 문제로 렌더링 이전에 받아오기를 시작하고 싶으나 이 방법은 렌더링을 하면서 쿼리를 진행할 수 있음.  
아래의 예시는 버튼을 누르자 마자 다음 유저 정보를 받아오기 시작함.  
`useRecoilCallback`을 사용함.
```javascript
function CurrentUserInfo() {
  const currentUser = useRecoilValue(currentUserInfoQuery);
  const friends = useRecoilValue(friendsInfoQuery);

  const changeUser = useRecoilCallback(({snapshot, set}) => (userID) => {
    snapshot.getLoadable(userInfoQuery(userID)); // pre-fetch user info
    set(currentUserIDState, userID); // change current user to start new render
  });

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id} onClick={() => changeUser(friend.id)}>
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Query Default Atom Values (기본 Atom 값 쿼리)
Atom 을 사용하여 변경 가능한 로컬의 state(상태)를 나타낼 수 있지만,  
그보다 selector 를 사용하여 기본값을 쿼리(별도 저장 공간)하는 것이 일반적인 사용 방법임. 

```javascript
const currentUserIDState = atom({
  key: 'CurrentUserID',
  default: selector({
    key: 'CurrentUserID/Default',
    get: () => myFetchCurrentUserID(),
  }),
});
```

## Async Queries Without React Suspense (React Suspense를 사용하지 않은 비동기 쿼리)
보류중인 비동기 selector를 다루기 위해서 React `Suspense`를 사용하는 것이 필수는 아닙니다. 
`useRecoilValueLoadable()` hook 을 사용하여 렌더링 중 상태(status)를 확인할 수도 있습니다.

```javascript
function UserInfo({userID}) {
  const userNameLoadable = useRecoilValueLoadable(userNameQuery(userID));
  switch (userNameLoadable.state) {
    case 'hasValue':
      return <div>{userNameLoadable.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
  }
}
```

## Query Refresh (쿼리 새로고침)

selector 는 항상 주어진 파라미터에 대해서는 여러번 실행 하더라도 멱등(idempotent) 해야 함. 
혹시 selector 가 값을 가지고 있고 해당 값을 갱신해야 하는 경우 아래의 몇 가지 방법이 있음.

### useRecoilRefresher()
`useRecoilRefresher_UNSTABLE()` hook 은 selector의 모든 캐시를 제거하고 강제로 다시 selector 를 재평가할 수 있게 하는 콜백 함수를 제공합니다.

```javascript
const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get: userID => async () => {
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response.data;
  }
})

function CurrentUserInfo() {
  const currentUserID = useRecoilValue(currentUserIDState);
  const currentUserInfo = useRecoilValue(userInfoQuery(currentUserID));
  const refreshUserInfo = useRecoilRefresher_UNSTABLE(userInfoQuery(currentUserID));

  return (
    <div>
      <h1>{currentUserInfo.name}</h1>
      <button onClick={() => refreshUserInfo()}>Refresh</button>
    </div>
  );
}
```

### Use a Request ID (요청 ID 사용하기)
ID 값을 종속성으로 추라해서 강제적으로 호출되도록 하기

```javascript
const userInfoQueryRequestIDState = atomFamily({
  key: 'UserInfoQueryRequestID',
  default: 0,
});

const userInfoQuery = selectorFamily({
  key: 'UserInfoQuery',
  get: (userID) => async ({get}) => {
    get(userInfoQueryRequestIDState(userID)); // Add request ID as a dependency
    const response = await myDBQuery({userID});
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

function useRefreshUserInfo(userID) {
  setUserInfoQueryRequestID = useSetRecoilState(
    userInfoQueryRequestIDState(userID),
  );
  return () => {
    setUserInfoQueryRequestID((requestID) => requestID + 1);
  };
}

function CurrentUserInfo() {
  const currentUserID = useRecoilValue(currentUserIDState);
  const currentUserInfo = useRecoilValue(userInfoQuery(currentUserID));
  const refreshUserInfo = useRefreshUserInfo(currentUserID);

  return (
    <div>
      <h1>{currentUserInfo.name}</h1>
      <button onClick={refreshUserInfo}>Refresh</button>
    </div>
  );
}
```

### Use an Atom (Atom 사용하기)
selector 대신 atom 을 사용하여 쿼리 결과를 모델링하는 것. Atom 상태를 새로운 쿼리 결과에 독자적인 새로고침 방침에 맞추어 명령적으로(imperatively) 업데이트 함.
```javascript
const userInfoState = atomFamily({
  key: 'UserInfo',
  default: (userID) => fetch(userInfoURL(userID)),
});

// React component to refresh query
function RefreshUserInfo({userID}) {
  const refreshUserInfo = useRecoilCallback(
    ({set}) => async (id) => {
      const userInfo = await myDBQuery({userID});
      set(userInfoState(userID), userInfo);
    },
    [userID],
  );

  // Refresh user info every second
  useEffect(() => {
    const intervalID = setInterval(refreshUserInfo, 1000);
    return () => clearInterval(intervalID);
  }, [refreshUserInfo]);

  return null;
}
```

