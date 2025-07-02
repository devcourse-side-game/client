import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from '@mui/material';
import { useUserGameProfiles } from '../../hooks/useGames';
import GameImage from '../../assets/gameImage.png';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { TUserGameProfile } from '../../types/Party';

type TUserGameProfileSelectProps = {
	userId: number;
	gameId?: number;
	setGameProfile: Dispatch<SetStateAction<TUserGameProfile | null>>;
	validate?: string;
};

export default function UserGameProfileSelect({
	userId,
	gameId,
	setGameProfile,
	validate,
}: TUserGameProfileSelectProps) {
	const [selectedValue, setSelectedValue] = useState<string>('');
	const [formGameUsername, setFormGameUsername] = useState<string>('');

	const {
		data: userGameProfiles,
		isLoading,
		isError,
		isSuccess,
	} = useUserGameProfiles({
		userId: userId,
		gameId: gameId ?? undefined,
	});

	// 초기값 설정
	useEffect(() => {
		if (isSuccess && userGameProfiles) {
			if (userGameProfiles.length > 0) {
				// 첫 번째 프로필을 선택
				const firstProfile = userGameProfiles[0];
				setSelectedValue(firstProfile.gameUsername);

				const gameProfile: TUserGameProfile = {
					id: firstProfile.id,
					userId: firstProfile.userId,
					gameId: firstProfile.gameId,
					gameUsername: firstProfile.gameUsername,
					game: firstProfile.game,
				};
				setGameProfile(gameProfile);
			} else {
				// 프로필이 없으면 '프로필 추가' 선택
				setSelectedValue('addProfile');
				setGameProfile(null);
			}
		}
	}, [isSuccess, userGameProfiles, setGameProfile]);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const value = event.target.value;
		setSelectedValue(value);

		if (value === 'addProfile') {
			const newProfile: TUserGameProfile = {
				id: null,
				userId: userId,
				gameId: gameId ?? null,
				gameUsername: formGameUsername,
				game: null,
			};
			console.log(newProfile);
			setGameProfile(newProfile);
		} else {
			const selectedProfile = userGameProfiles?.find(
				(profile) => profile.gameUsername === value
			);
			if (selectedProfile) {
				const gameProfile: TUserGameProfile = {
					id: selectedProfile.id,
					userId: selectedProfile.userId,
					gameId: selectedProfile.gameId,
					gameUsername: selectedProfile.gameUsername,
					game: selectedProfile.game,
				};
				console.log(gameProfile);
				setGameProfile(gameProfile);
			}
		}
	};

	return (
		<>
			<FormControl>
				<InputLabel id='userGameProfileSelect'>유저 게임 프로필</InputLabel>
				<Select
					labelId='userGameProfileSelect'
					id='userGameProfileSelect'
					value={selectedValue}
					label='유저 프로필'
					onChange={handleChange}
				>
					{userGameProfiles?.map((profile) => (
						<MenuItem key={profile.id} value={profile.gameUsername}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<img
									src={profile.game?.bannerUrl || GameImage}
									alt={profile.game?.name || ''}
									loading='lazy'
									onError={(e) => {
										e.currentTarget.src = GameImage;
									}}
									style={{
										width: 120,
										height: 60,
										objectFit: 'cover',
										borderRadius: 4,
									}}
								/>
								<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
									<Typography variant='body1' fontWeight={600}>
										{profile.gameUsername}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										{profile.game?.name}
									</Typography>
								</Box>
							</Box>
						</MenuItem>
					))}
					<MenuItem key='addProfile' value='addProfile'>
						<Typography variant='body1' fontWeight={600}>
							프로필 추가
						</Typography>
					</MenuItem>
				</Select>
			</FormControl>
			{selectedValue === 'addProfile' ? (
				<TextField
					value={formGameUsername}
					type='text'
					label='게임 닉네임'
					placeholder='게임 프로필에 사용할 닉네임을 입력하세요'
					required
					error={!!validate}
					helperText={validate}
					onChange={(e) => setFormGameUsername(e.target.value)}
				/>
			) : null}
		</>
	);
}

//TODO : 프로필 추가 입력 후 바로 입력한 값이 적용 안되는 문제 수정 필요
//TODO : 프로필이 있을 경우 프로필 추가를 해도 기존 프로필이 들어가는 문제 논의
