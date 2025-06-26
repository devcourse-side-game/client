import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			prettier: prettier,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
			'arrow-body-style': 'off',
			'prefer-arrow-callback': 'off',
			'react/jsx-no-target-blank': 'off',
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'default',
					format: null, // 나머지 기본은 규칙 적용 안 함
				},
				{
					selector: 'variableLike', // 변수, 매개변수, 속성 등
					format: ['camelCase'],
					leadingUnderscore: 'allow', // 필요하면 'forbid'로 변경
				},
				{
					selector: 'function',
					format: null, // 함수는 규칙 적용 안 함
				},
				{
					selector: 'method',
					format: null, // 클래스/객체 메서드도 제외
				},
				{
					selector: 'variable',
					modifiers: ['const'],
					filter: {
						regex: 'Context$', // 정규식: 이름이 Context로 끝나는 경우 - 함수형 컨텍스트
						match: true,
					},
					format: ['PascalCase'],
				},
			],
			'prettier/prettier': [
				'error',
				{
					semi: true,
				},
			],
		},
	}
);
