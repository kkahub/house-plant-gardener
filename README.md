# House Plant Gardener (vue3-firebase-app)

House Plant Gardeners Project

[배포 사이트>>](https://house-plant-gardener.web.app/)

<br/><br/>

## Key Skills

- **View** : Vue3
- **Build Tool** : Vite
- **CSS Preprocessor** : SCSS
- **Javascript** : ES6, Typescript
- **State Management** : Pinia
- **Database** : Firebase
- **Coding Convention** : ESLint, Prettier

  <br/><br/>

## library

### unplugin-vue-router

[unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

- **자동 라우팅**
  - root 수준의 자동 라우팅으로 편함.
  - 중첩 라우팅의 경우 폴더링 고민을 해야하며 아직 라이브러리가 실험 단계가 단점.

### vite-plugin-pages

[vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)

- **page 구성 :** layout > page 구조로 구성 도움.

### vite-plugin-vue-layouts

[vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)

- **layout 구성 :** layout > page 구조로 구성 도움.

### VueUse

[VueUse](https://vueuse.org/)

- 유용한 컴포저블 모음

### Tiptap

[Tiptap](https://tiptap.dev/)

- 텍스트 에디터

### vee-validate, yup

[vee-validate](https://vee-validate.logaretm.com/v4/tutorials/basics)
[yup](https://github.com/jquense/yup)

- 유효성검사, 에러메시지 제공

  <br/><br/>

## Open API

**산림청 국립수목원 식물자원 서비스 :** [API 소개>>](https://www.data.go.kr/data/15000312/openapi.do)

**농촌진흥청 실내정원용 식물 :** [API 소개>>](https://www.data.go.kr/data/15059042/openapi.do)

## 프로젝트 주의사항

- yarn install 후에도 파이어베이스 별도 설치 필요
  -- npm install -g firebase-tools
  -- firebase --version 로 확인
  -- cd firebase
  -- firebase login
  -- cd functions
  -- yarn install
  -- /firebase/functions/serviceAccountKey.json 파일 넣기
  -- ./.env 파일 넣기

<br/><br/>

- 보안규칙 배포
  -- firebase deploy --only firestore
