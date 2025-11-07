import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const LS_KEY = 'lang';
const initialLng = (typeof window !== 'undefined' && localStorage.getItem(LS_KEY)) || 'ko';

export const setLanguage = (lng: 'ko' | 'en') => {
  i18n.changeLanguage(lng);
  if (typeof window !== 'undefined') localStorage.setItem(LS_KEY, lng);
};

const resources = {
  ko: {
    common: {
      brand: '컴퍼니',
      logout: '로그아웃',
      lang_ko: '한국어',
      lang_en: 'English',
      Home: '홈',
    },
    auth: {
      title: '로그인',
      helper: '이메일과 비밀번호를 입력하세요.',
      emailPlaceholder: '이메일',
      passwordPlaceholder: '비밀번호',
      login: '로그인',
      submitting: '확인 중…',
      errors: {
        required: '필수 입력 항목입니다.',
        invalid_email: '올바른 이메일 형식이 아닙니다.',
        invalid_password: '비밀번호 형식이 올바르지 않습니다.',
        invalid_credentials: '이메일 또는 비밀번호를 확인해 주세요.',
      },
    },
    home: {
      greeting: '안녕하세요',
      greeting_named: '안녕하세요, {{name}}',
      subtitle: '과제 실행 패널입니다. 아래에서 게시판과 차트로 바로 이동할 수 있어요.',
      posts: {
        title: '게시판(Posts)',
        desc: '작성/조회/수정/삭제, 검색, 정렬, 카테고리 필터, 커서 기반 페이지네이션',
      },
      charts: {
        title: '데이터 시각화',
        desc: 'Mock API 기반 바/도넛/스택형/멀티라인 차트',
      },
    },
    footer: {
      contact: 'Contact',
      email: 'test@test.net',
      companyBlock: `주식회사 컴퍼니
대표 : ㅁㅁㅁ
사업자 등록번호 : 123-45-678910
12345, 서울특별시 강남구 테헤란로 00-0`,
    },
    posts: {
      title: '게시글',
      new: '새 글',
      edit: '글 수정',
      loading: '불러오는 중…',
      notFound: '존재하지 않는 글입니다.',
      no_more: '마지막 글입니다.',
      allDelete: '전체 삭제',
      searchPlaceholder: '제목/본문 검색',
      category_all: '전체',
      category_NOTICE: '공지',
      category_QNA: '질문',
      category_FREE: '자유',
      sort_createdAt: '작성일',
      sort_title: '제목',
      order_desc: '내림차순',
      order_asc: '오름차순',
      btn_edit: '수정',
      btn_delete: '삭제',
      form_title: '제목 (최대 80자)',
      form_body: '본문 (최대 2000자, 금칙어 필터 적용)',
      form_category: '카테고리',
      form_tags: '태그 (쉼표 구분, 최대 5개 · 각 24자)',
      form_tags_ph: 'react, ts',
      submit_create: '등록',
      submit_edit: '수정',
      submitting: '처리 중…',
      err_no_title: '제목을 입력하세요.',
      err_title_max: '제목은 최대 80자입니다.',
      err_no_body: '본문을 입력하세요.',
      err_body_max: '본문은 최대 2000자입니다.',
      err_forbidden: '금칙어(캄보디아/프놈펜/불법체류/텔레그램)가 포함되어 등록할 수 없습니다.',
      err_no_changes: '변경된 내용이 없습니다.',
    },
    charts: {
      title_brands_donut: '인기 커피 브랜드 (도넛)',
      title_brands_bar: '브랜드 분포 (막대)',
      title_weekly_area: '주간 무드 (스택 면적)',
      title_weekly_bar: '주간 무드 (스택 바)',
      title_coffee_multi: '커피 섭취량 vs 버그/생산성 (팀별)',
      legend_popularity: '인기도',
      brands: {
        starbucks: '스타벅스',
        composecoffee: '컴포즈커피',
        coffeebean: '커피빈',
        banapresso: '바나프레소',
        others: '기타',
      },

      series_happy: '행복',
      series_tired: '피곤',
      series_stressed: '스트레스',

      axis_cups_per_day: '잔/일',
      axis_bugs: 'Bugs',
      axis_prod: 'Productivity',

      tooltip_team: '{{team}}',
      tooltip_cups: '잔수: {{value}}',
      tooltip_bugs: '버그: {{value}}',
      tooltip_prod: '생산성: {{value}}',

      tooltip_percent: '{{value}}%',
    },
    notFound: {
      title: '404',
      desc: '페이지를 찾을 수 없어요. 주소를 다시 확인해주세요.',
      back: '이전으로',
      home: '홈으로',
    },
  },
  en: {
    common: {
      brand: 'Company',
      logout: 'Logout',
      lang_ko: 'Korean',
      lang_en: 'English',
      Home: 'Home',
    },
    auth: {
      title: 'Sign in',
      helper: 'Enter the email and password.',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      login: 'Sign in',
      submitting: 'Checking…',
      errors: {
        required: 'This field is required.',
        invalid_email: 'Invalid email format.',
        invalid_password: 'Invalid password format.',
        invalid_credentials: 'Please check your email or password.',
      },
    },
    home: {
      greeting: 'Hello',
      greeting_named: 'Hello, {{name}}',
      subtitle: 'This is the task control panel. Jump to the board or charts below.',
      posts: {
        title: 'Posts',
        desc: 'Create/Read/Update/Delete, search, sort, category filter, cursor-based pagination',
      },
      charts: {
        title: 'Charts',
        desc: 'Mock APIs: bar/donut/stacked/multi-line charts',
      },
    },
    footer: {
      contact: 'Contact',
      email: 'test@test.net',
      companyBlock: `Company Inc.
CEO : aaa Kim
Business registration number : 123-45-678910
12345, 00-0, Teheran-ro, gangnam-gu,
Seoul, Republic of Korea`,
    },
    posts: {
      title: 'Posts',
      new: 'New Post',
      edit: 'Edit Post',
      loading: 'Loading…',
      notFound: 'Post not found.',
      no_more: 'no more.',
      allDelete: 'Delete all',
      searchPlaceholder: 'Search title/body',
      category_all: 'All',
      category_NOTICE: 'Notice',
      category_QNA: 'Q&A',
      category_FREE: 'Free',
      sort_createdAt: 'Created',
      sort_title: 'Title',
      order_desc: 'Desc',
      order_asc: 'Asc',
      btn_edit: 'Edit',
      btn_delete: 'Delete',
      form_title: 'Title (max 80)',
      form_body: 'Body (max 2000, forbidden words blocked)',
      form_category: 'Category',
      form_tags: 'Tags (comma separated, up to 5 · 24 chars each)',
      form_tags_ph: 'react, ts',
      submit_create: 'Create',
      submit_edit: 'Save',
      submitting: 'Submitting…',
      err_no_title: 'Please enter a title.',
      err_title_max: 'Title can be up to 80 characters.',
      err_no_body: 'Please enter content.',
      err_body_max: 'Body can be up to 2000 characters.',
      err_forbidden: 'Contains forbidden words (Cambodia/Phnom Penh/Illegal stay/Telegram).',
      err_no_changes: 'No changes.',
    },
    charts: {
      title_brands_donut: 'Top Coffee Brands (Donut)',
      title_brands_bar: 'Brand Distribution (Bar)',
      title_weekly_area: 'Weekly Mood (Stacked Area)',
      title_weekly_bar: 'Weekly Mood (Stacked Bar)',
      title_coffee_multi: 'Coffee Intake vs Bugs/Productivity (by Team)',
      legend_popularity: 'Popularity',

      brands: {
        starbucks: 'Starbucks',
        composecoffee: 'Compose Coffee',
        coffeebean: 'The Coffee Bean',
        banapresso: 'Banapresso',
        others: 'Others',
      },

      series_happy: 'happy',
      series_tired: 'tired',
      series_stressed: 'stressed',

      axis_cups_per_day: 'cups/day',
      axis_bugs: 'Bugs',
      axis_prod: 'Productivity',

      tooltip_team: '{{team}}',
      tooltip_cups: 'Cups: {{value}}',
      tooltip_bugs: 'Bugs: {{value}}',
      tooltip_prod: 'Productivity: {{value}}',

      tooltip_percent: '{{value}}%',
    },
    notFound: {
      title: '404',
      desc: 'We couldn’t find the page you requested.',
      back: 'Go back',
      home: 'Go home',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: initialLng,
  fallbackLng: 'ko',
  supportedLngs: ['ko', 'en'],
  ns: ['common', 'auth', 'charts', 'posts'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
