import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

/**
	redux (redux-saga, redux-toolkit)
	-context api를 활용한 전역 state관리 라이브러리
	-redux로 전역관리를 해야하는 이유

	1. 여러 컴포넌트에 자주 써야하는 데이터값을 매번 컴포넌트에 호출하는 것이 초기에 불러온 데이터를 한번에 전역공간에 저장
	2. 위와 같이 자주 쓰는 값들을 전역 state에 저장해놓으면 저장되어있는 값을 불러오기만 하면 되기 때문에 유지보수가 편함
	2. 특정 데이터를 특정컴포넌트에 종속시켜놓으면 해당 데이터를 수정해야 될때 일일이 해당 파일을 찾아서 수정해야되는 번거로움, 전역데이터 관리는 컴포넌트 외부에서 독립적으로 데이터를 관리할 수 있기 때문에 유지보수가 편함
	3. 리액트는 단방향 데이터 바인딩이기 떄문에 하위 뎁스의 컴포넌트 데이터를 상위 컴포넌트나 또다른 컴포넌트에 전달하기 위해서는 엄청나게 많은 중간 단계 컴포넌트를 거쳐야 하기 때문에 개발 구조가 상당히 복잡해지지만 전역 상태관리를 활용하면 해당 데이터에 바로 접근해서 수정 가능

 */
