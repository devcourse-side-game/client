import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import PartyListItem from './PartyListItem';
import { useParties } from '../../hooks/useParties';

function PartyList() {
	const { data, isLoading, isFetching, isSuccess, isError, error } = useParties();
	const [expandedPartyId, setExpandedPartyId] = useState<number | null>(null);

	// parties의 값이 성공적으로 변경됬을 경우 현재 열려야 하는 아코디언 정보를 초기화
	useEffect(() => {
		if (!isFetching && isSuccess) {
			setExpandedPartyId(null);
		}
	}, [isFetching, isSuccess]);

	if (isLoading) return <div>파티 목록 로딩중...</div>;
	if (isError) return <div> 에러가 발생했습니다 : {error.message} </div>;
	return (
		<List
			sx={{
				display: 'flex',
				flexDirection: 'column',
				maxWidth: '80%',
				width: '800px',
			}}
		>
			{data?.parties.map((party) =>
				party ? (
					<PartyListItem
						key={party.id}
						party={party}
						expandedPartyId={expandedPartyId}
						setExpandedPartyId={setExpandedPartyId}
					/>
				) : null
			)}
		</List>
	);
}

export default PartyList;
