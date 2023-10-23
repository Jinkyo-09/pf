import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
	const pid = 'PL2pfG9YtKxMJVwlAjAIV9TBF5-44WnQ-q';
	const num = 5;
	const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const { data } = await axios.get(resultURL);
	return data.items;
};

/**
  react-quary는 쿼리키를 문자열로 지정해서 데이터 호출시 쿼리키의 문자열이 동일하면 동일한 데이터로 인지해서 refetching처리하지 않고 캐싱되어있는 데이터를 재활용한다

  useQuary([쿼리키],fetching함수, 캐싱옵션)

  react-quary에서 쓰이는 데이터 상태 개념
  - pending : 데이터 요청을 보내고 응답을 받기까지의 상태
  - fresh : 작업자가 직접 지정한 데이터의 신선한 상태
  - stale : 작업자가 지접 지정한 데이터의 신선하지 못한 옛날 데이터의 상태
  - inactive : 해당 컴포넌트에서 react-quary로 관리하고 있는 데이터를 비활성화 상태

  비동기 데이터가  inactive가 되면 무조건 캐시타임 카운트
  inactive가 아닌 상태에서 data가 stale상태면 refetching발생
  inactive 상태가 아니고 아직 fresh상태이면 refetching발생하지 않음

  react-quary로 관리하는 서버 데이터가 만약 24시간 주기로 변경된다고 하면 staleTime을 24시간으로 지정해서 24시간 안에는 데이터를 refetching하지 않도록 처리
 */

export const useYoutubeQuary = () => {
	return useQuery(['YoutubeData'], fetchYoutube, {
		refetchOnWindowFocus: false,
		refrtchOnMount: false,
		cacheTime: 1000 * 60 * 60,
		staleTime: 1000 * 60 * 60,
	});
};