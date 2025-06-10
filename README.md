# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time.
This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel,
ESLint, etc) right into your project so you have full control over them. All of the commands except
`eject` will still work, but they will point to the copied scripts so you can tweak them. At this
point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle
deployments, and you shouldn’t feel obligated to use this feature. However we understand that this
tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## ESLint 설정

`npm run lint` : ESLint 확인 명령어

`npm run lint:fix` : 잘못된 규칙을 자동으로 고쳐줌. (변수 명명 변경은 X)

### 자동 저장 시 ESLint/prettier 자동 수정

- Ctrl+Shift+P (Win/Linux) 또는 ⌘+Shift+P (Mac) → “Preferences: Open Settings (JSON)” 입력 후 선택

```json
    "powermode.shake.enabled": false,
    // 저장 시 자동 포맷
    "editor.formatOnSave": true,

    // 저장 시 ESLint로 자동 고침 실행
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit",
        "source.fixAll.eslint": "explicit"
    },
```

## Library

### Redux

@reduxjs/toolkit npm install react-redux (25-06-09 added)

### MUI

@mui/material @emotion/react @emotion/styled (25-06-09 added)

### react-router-dom

react-router-dom (25-06-09 added)

### React Query

@tanstack/react-query (25-06-09 added)

### React Hook Form

react-hook-form (25-06-09 added)

### Axios

axios (25-06-09 added)

## 폴더구조

```
my-app/
├── public/
│ └── index.html
├── src/
│ ├── assets/ # 이미지, 폰트, CSS 등 정적 파일
│ ├── components/ # 재사용 가능한 UI 컴포넌트
│ ├── pages/ # 라우팅 단위의 페이지 컴포넌트
│ ├── routes/ # react-router 설정
│ ├── hooks/ # 커스텀 훅
│ ├── stores/ # 상태관리 (ex. recoil, zustand, jotai 등)
│ ├── apis/ # API 호출 관련 로직 (axios 인스턴스, 함수들)
│ ├── types/ # TypeScript 타입 정의
│ ├── utils/ # 공통 유틸 함수
│ ├── constants/ # 상수 모음 (enum, 문자열 등)
│ ├── layouts/ # 공통 레이아웃 컴포넌트 (Header, Footer 등)
│ ├── styles/
│ ├── App.tsx
│ └── index.tsx # Vite 기준 (CRA는 index.tsx)
├── .eslintrc.js
├── .prettierrc
├── tsconfig.json
├── vite.config.ts # 또는 CRA면 webpack 설정
└── package.json
```
