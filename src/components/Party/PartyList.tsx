import React, { useState } from 'react';
import List from '@mui/material/List';
import PartyListItem from './PartyListItem';
import { useParties } from '../../hooks/useParties';

function PartyList() {
	const { data, isLoading, isError, error } = useParties();
	const [expandedPartyId, setExpandedPartyId] = useState<number | null>(null);

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
