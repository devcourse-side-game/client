import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Modal,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import { useUser } from '../../hooks/useUsers';
import { useDialog } from '../../contexts/AuthModalContext';
import { deleteUserAip } from '../../api/user';
import { AppDispatch } from '../../stores';
import { useDispatch } from 'react-redux';
import { logout } from '../../stores/authSlice';
import { FormInputs, TextButton } from '../../styles/pages/party/forms/Form.styles';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PASSWARD_LETTER, PASSWARD_NUMBER } from '../../constants/regex';
import { ENTER_PASSWORD } from '../../constants/error';

function MyPageComponent() {
	const dispatch = useDispatch<AppDispatch>();
	const [open, setOpen] = useState(false);
	const {
		control, // ✅ 여기서 가져옴!
		formState: { errors },
	} = useForm();

	function handleSave() {
		show('정말로 계정을 삭제하시겠습니까?', async () => {
			console.log('계정 삭제 처리 진행');
			await deleteUserAip(); // 계정 삭제 처리 진행
			await dispatch(logout()); // Redux 상태 & localStorage 정리
		});
	}

	function handleClose() {
		setOpen(false);
	}
	const { data, isLoading } = useUser();
	const { show } = useDialog();
	const theme = useTheme();

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 600,
						bgcolor: theme.customColor.background.mainBg,
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h2'
						sx={{ color: theme.customColor.title.main }}
					>
						비밀번호 수정
					</Typography>

					<Divider sx={{ my: 2 }} />
					<Controller
						name='currentPassword'
						control={control}
						rules={{
							required: '비밀번호를 입력해주세요.',
							pattern: {
								value: PASSWARD_NUMBER,
								message: ENTER_PASSWORD,
							},
						}}
						render={({ field, fieldState }) => (
							<FormInputs
								{...field}
								type='password'
								label='기존 패스워드'
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
								fullWidth
								sx={{ marginBottom: '10px' }}
							/>
						)}
					/>

					<Controller
						name='changePassword'
						control={control}
						rules={{
							required: '비밀번호를 입력해주세요.',
							pattern: {
								value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
								message: '영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
							},
						}}
						render={({ field, fieldState }) => (
							<FormInputs
								{...field}
								type='password'
								label='변경할 패스워드'
								error={!!fieldState.error}
								helperText={fieldState.error?.message}
								fullWidth
								sx={{ marginBottom: '10px' }}
							/>
						)}
					/>
				</Box>
			</Modal>
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
						<Typography color={theme.customColor.title.sub}>
							{data?.createdAt.toString().split('T')[0]}
						</Typography>
					</Box>
				</Box>

				<Divider sx={{ my: 2 }} />

				<FormInputs fullWidth label='이메일' value={data?.email} disabled sx={{ mt: 2 }} />
				<Grid container spacing={2}>
					<Grid size={10}>
						<FormInputs
							fullWidth
							label='비밀번호'
							type='password'
							value='defaultPassword'
							disabled
							sx={{ mt: 2 }}
						/>
					</Grid>
					<Grid size={'grow'} sx={{ height: '100%' }}>
						<TextButton
							sx={{ height: '55px', mt: 2 }}
							variant='text'
							fullWidth
							onClick={() => setOpen(true)}
						>
							수정
						</TextButton>
					</Grid>
				</Grid>

				<Grid container spacing={2} sx={{ mb: 4 }}>
					<Grid size={10}>
						<FormInputs
							fullWidth
							label='닉네임'
							value={data?.username}
							disabled
							sx={{ mt: 2 }}
						/>
					</Grid>
					<Grid size={'grow'} sx={{ height: '100%' }}>
						<TextButton
							sx={{ height: '55px', mt: 2 }}
							variant='text'
							fullWidth
							onClick={() => console.log('ㅇㅇㅇ')}
						>
							수정
						</TextButton>
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
