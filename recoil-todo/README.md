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
이 상태 어떠한 목적을 가지고 변경을 하거나 추출해서 새로이 파생시킨 상태로 만들게 된다.    
파생된 상태는 어떤 방법으로든 주어진 상태를 수정하는 순수 함수로 
전달되어진 상태가 만들어 낸 결과물로 생각할 수 있다.  
파생된 상태는 다른 데이터에 의존하는 동적인 데이터로 만들어지게 됨.  

`쭉 의존하게 되는 것인가? 아니면 현재 컴포넌트에서만 잠시 의존하게 되는가?`

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
