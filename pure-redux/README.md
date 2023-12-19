# pure-redux

## Vanilla redux

* Redux를 이루고 있는 요소의 역할에 대해서 이해를 해야 한다.
* 각 요소간의 상호 협력적인 구조를 파악해야 한다.
* 요소
  * createStore
    * 데이터를 넣을 수 있는 장소(store)를 생성함.   
    * Store
      * 관리해야 할 데이터(state 혹은 상태)를 저장하는 곳
      * state : 어플리케이션이 관리하는 데이터 (상황에 따라 변경이 되는 데이터)
        * 예제에서 state 는 무엇일까? 정답은 count 변수.
    * Reducer(state, action)
      * 나의 데이터를 변경하는 function
      * 상태(state)를 최종 변경한 후에 리턴값에 담아서 전달함.
      * 상태의 값이 없을 경우 초기값을 할당 (initialValue)
      * state 에는 항상 마지막 state 의 값을 가지고 Reducer 가 호출 된다.  
      * 두 번째 인자는 dispatch 에서 전달한 메세지를 담고 있음.
      * 반드시 type 이라는 속성에 메세지를 담아야 함. 
  * Actions
    * 메세지를 전달하는 용도로만 사용함.
    * 반드시 type 속성에 메세지를 담아서 전달해야 함. 
  * dispatch(object)
    * Action 이라는 하나의 객체에 메세지를 담아서 보내기 위해 사용
    * 이 메서드를 호출해야만 Reducer 가 비로소 동작을 하게 된다.
    * 예: store.dispatch({ type: 'ADD' });
  * getState()
    * 현재 상태 값을 가져오는 부분
  * publish
    * 상태값의 변화가 있을 때마다 호출하는 함수
    * function 이 반복적으로 호출된다.
    * 예) store.publish(function)
