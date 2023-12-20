# React Redux

## 이전 단계보다 업그레이드

* action 객체를 통해서 reducer 랑 커뮤니케이션 하기.  
* action 객체의 확장
  * type 속성 : 필수값
  * 그 외 사용자 정의 속성을 입력할 수 있음.
  * 예) { type: 'ADD', todo : 'Study Redux' }
* Array.filter : 새로운 array 객체를 생성함
* [구조 분해 할당](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
  * [{ text: action.text, id: action.id }, ...state]
  * [다른 참조](https://ko.javascript.info/destructuring-assignment)

## [모던 자바스크립트 튜토리얼](https://ko.javascript.info/)