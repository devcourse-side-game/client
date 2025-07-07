import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { searchMyDataApi } from '../../api/user';

const fetchUser = async () => {
	const data = await searchMyDataApi();
	return data;
};

function MyPageComponent() {
	function handleSave() {
		console.log('계정 삭제 확인 모달');
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ['user'],
		queryFn: fetchUser,
	});

	console.log(data);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<>
			<Container maxWidth='sm' sx={{ p: 2, width: '500px' }}>
				<Box display='flex' alignItems='center' gap={2}>
					<Box>
						<Typography variant='h5'>기본정보</Typography>
					</Box>
				</Box>

				<Divider sx={{ my: 2 }} />

				<Box display='flex' alignItems='center' gap={2}>
					<Avatar src='/profile.jpg' sx={{ width: 64, height: 64 }} />
					<Box>
						<Typography variant='h6'>{data?.username}</Typography>
						<Typography color='text.secondary'>
							{data?.createdAt.toString().split('T')[0]}
						</Typography>
					</Box>
				</Box>

				<Divider sx={{ my: 2 }} />

				<TextField fullWidth label='이메일' value={data?.email} disabled sx={{ mt: 2 }} />
				<Grid container spacing={2}>
					<Grid size={10}>
						<TextField
							fullWidth
							label='비밀번호'
							type='password'
							value={data?.password}
							disabled
							sx={{ mt: 2 }}
						/>
					</Grid>
					<Grid size={'grow'} sx={{ height: '100%' }}>
						<Button
							sx={{ height: '55px', mt: 2 }}
							variant='text'
							fullWidth
							onClick={() => console.log('ㅇㅇㅇ')}
						>
							수정
						</Button>
					</Grid>
				</Grid>

				<Grid container spacing={2} sx={{ mb: 4 }}>
					<Grid size={10}>
						<TextField
							fullWidth
							label='닉네임'
							value={data?.username}
							disabled
							sx={{ mt: 2 }}
						/>
					</Grid>
					<Grid size={'grow'} sx={{ height: '100%' }}>
						<Button
							sx={{ height: '55px', mt: 2 }}
							variant='text'
							fullWidth
							onClick={() => console.log('ㅇㅇㅇ')}
						>
							수정
						</Button>
					</Grid>
				</Grid>

				<Divider sx={{ my: 2 }} />

				<Grid container gap={2} direction='row'>
					<Grid size={4}>
						<Typography
							sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
							variant='h6'
						>
							계정 삭제하기
						</Typography>
					</Grid>
					<Grid size='grow'></Grid>
					<Grid size={3}>
						<Button variant='outlined' color='error' fullWidth onClick={handleSave}>
							계정 탈퇴
						</Button>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default MyPageComponent;
