/**
	1. csr 방식에 대해서 설명하시오
	2. ssr방식에 비해 scr방식의 장점과 단점에 대해 설명
	3. react 프로젝트에서 public, src 폴더를 통해서 어떤 식으로 빌드되면서 화면 렌더링 되는지 설명
	

	하단에 답변
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import modalReducer from './redux/modalSlicke';
import menuReducer from './redux/menuSlice';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		modal: modalReducer,
		menu: menuReducer,
	},
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/**
	1. csr 방식에 대해서 설명하시오
	A: 
	- Client Side Rendering vs (Sever Side Rendering)
	- 예전 ssr방식은 각 페이지마다 html파일을 직접 만들어 놓은 뒤 사용자가 url입력시 직접 서버에서 각각의 html 파일을 불러와서 렌더링 하는 방식
	- 사용자가 url입력해서 페이지를 요청하면 빈 html파일만 서버에서 가져오는 동시에 jsx를 반환하는 react 컴포넌트 파일을 같이 불러옴
	- react 컴포넌트가 모두 동작되면 빈 html문서에 동적으로 모든 컴포넌트가 렌더링 됨
	- 초기에 모든 서브페이지에 대한 파일들을 모두 가져와서 url요청에 따라서 미리 가져온 react 컴포넌트를 바꾸면서 화면을 변경

	2. ssr방식에 비해 scr방식의 장점과 단점에 대해 설명
	A: 
	- 초기 로딩속도가 scr방식에 비해 오래걸림
	- 처음에 빈 html파일을 가져오고 모든 react 컴포넌트가 마운트 되기 전까지는 사용자는 빈 화면을 보고있어야함 --> 검색엔진에 좋지 않음
	ㄴ 해결방법 : next.js라는 frameWork를 이용하여 ssr, csr 방식이 결합된 hydration을 활용
	ㄴ 해결방식 : index.html을 불러오고 동적인 react리액트 컴포넌트 마운트 되기 전까지 static데이터를 미리 출력해서 검색엔진 최적화

	3. react 프로젝트에서 public, src 폴더를 통해서 어떤 식으로 빌드되면서 화면 렌더링 되는지 설명
	A: 
	- index.js를 구동파일로 해서 app.js에 있는 모든 컴포넌트를 불러온 다음, 내부적으로 내장되어있는 webpack이라는 번들러에 의해서 하나의 js파일로 번들링되고 번들링된 파일이 index.js에 의해서 public폴더 안쪽에 있는 index.html에 합쳐지면서 빌드가 완료됨.
	- 그럼 브라우저에서는 빌드완료된 index.html을 읽어서 화면 렌더링

	정확하게 모두 외울 필요 x
	무슨 계념인지 이해하고 설명할수 있으면 됨


		redux-toolkit으로 클라이언트, 서버 데이터 구분없이 전역상태관리의 문제점
	- 기존에는 서버사이드 데이터로 전역store에 static하게 저장을 하다보니 실시간으로 자주바뀌는 데이터 경우에는
	- 결국 전역 store에 최신데이터가아닌 예전 데이터를 관리하게 됨 
	- 서버 데이터를 전역에 저장하는 것 자체가 잘못된 방식이기 때문에 
	- 서버 데이터가 필요할때마다 계속 가져와야됨
	- 새로 fetching을 할때 이미 불러온적이 있는 똑같은 데이터경우는 caching 처리된 데이터를 재활용해서 불필요한 refetching방지
	client-side-data (useContext를 활용한 커스텀훅을 전역관리)
	server-side-data (react-query를 활용해서 전역상태로 저장하는 것이 아닌 캐싱처리)
 */
