import { Container, MenuList } from '@mui/material';
import MenuItemCompoent from './MenuItemComponent';
function MyPageNaviComponent() {
	return (
		<Container>
			<MenuList>
				<MenuItemCompoent menuTitle='계정 관리' path='/mypage' />
				<MenuItemCompoent menuTitle='게임' path='/mypage/game' />
				<MenuItemCompoent menuTitle='테마' path='/mypage/theme' />
			</MenuList>
		</Container>
	);
}

export default MyPageNaviComponent;
