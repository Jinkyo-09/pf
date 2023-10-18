import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import youtubeReducer from './redux/youtubeSlice';
import flickrReducer from './redux/flickrSlice';
import modalReducer from './redux/modalSlicke';
import menuReducer from './redux/menuSlice';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

//youtubeReducer가 반환한 데이터를 유튜브 프로퍼티에 담아서 객체형태로 store에 등록
//store에는 하나의 객체만 등록가능하기 때문에 여러개의 데이터 카테고리는 reducer로 통합하여 등록
const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		flickr: flickrReducer,
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

//test
