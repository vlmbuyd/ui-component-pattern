import { Dropdown1 } from './components/dropdown/compound';
import Dropdown2 from './components/dropdown/headless';
import Dropdown3 from './components/dropdown/headless-hook';
import Dropdown4 from './components/dropdown/html-select';
import ModalContext from './components/modal/context';
import ModalCreatePortal from './components/modal/createPortal';
import ModalDialog from './components/modal/dialog';
import TabMenus from './components/tabMenu';

export const routePaths = [
  '/',
  '/accordion',
  '/tabMenu',
  '/tooltip',
  '/textBox',
  '/lineClamp',
  '/lazyLoading',
  '/infiniteScroll',
  '/scrollBox',
  '/scrollSpy',
  '/snackbar',
  '/modal',
  '/modal/context',
  '/modal/createPortal',
  '/modal/dialog',
  '/popover',
  '/imageSlide',
  '/carousel',
  '/gallery',
  '/dropdown',
  '/dropdown/compound',
  '/dropdown/headless',
  '/dropdown/headless-hook',
  '/dropdown/html-select',
  '/autoComplete',
  '/dnd',
] as const;
export type ROUTE_PATH = (typeof routePaths)[number];

type BaseRoute = {
  key: ROUTE_PATH;
  link: ROUTE_PATH;
  name: string;
};
export type ParentRoute = BaseRoute & {
  children: ROUTE_PATH[];
};
export type ChildRoute = BaseRoute & {
  children: ((props: unknown) => JSX.Element) | null;
};
export type ROUTE = ParentRoute | ChildRoute;

export const routes: Record<ROUTE_PATH, ROUTE> = {
  '/': {
    key: '/',
    link: '/',
    name: 'root',
    children: [
      '/accordion',
      '/tabMenu',
      '/tooltip',
      '/textBox',
      '/lineClamp',
      '/lazyLoading',
      '/infiniteScroll',
      '/scrollBox',
      '/scrollSpy',
      '/snackbar',
      '/modal',
      '/popover',
      '/imageSlide',
      '/carousel',
      '/gallery',
      '/dropdown',
      '/autoComplete',
      '/dnd',
    ],
  },
  '/accordion': {
    key: '/accordion',
    link: '/accordion',
    name: '01. 아코디언',
    children: null,
  },
  '/tabMenu': {
    key: '/tabMenu',
    link: '/tabMenu',
    name: '02. 탭메뉴',
    children: TabMenus,
  },
  '/tooltip': {
    key: '/tooltip',
    link: '/tooltip',
    name: '03. 툴팁',
    children: null,
  },
  '/textBox': {
    key: '/textBox',
    link: '/textBox',
    name: '04. 반응형 텍스트박스',
    children: null,
  },
  '/lineClamp': {
    key: '/lineClamp',
    link: '/lineClamp',
    name: '05. 여러줄 말줄임',
    children: null,
  },
  '/lazyLoading': {
    key: '/lazyLoading',
    link: '/lazyLoading',
    name: '06. 지연 로딩',
    children: null,
  },
  '/infiniteScroll': {
    key: '/infiniteScroll',
    link: '/infiniteScroll',
    name: '07. 무한 스크롤',
    children: null,
  },
  '/scrollBox': {
    key: '/scrollBox',
    link: '/scrollBox',
    name: '08. 횡 스크롤 박스',
    children: null,
  },
  '/scrollSpy': {
    key: '/scrollSpy',
    link: '/scrollSpy',
    name: '09. 스크롤 스파이',
    children: null,
  },
  '/snackbar': {
    key: '/snackbar',
    link: '/snackbar',
    name: '10. 스낵바',
    children: null,
  },
  '/modal': {
    key: '/modal',
    link: '/modal/context',
    name: '11. 모달',
    children: ['/modal/context', '/modal/createPortal', '/modal/dialog'],
  },
  '/modal/context': {
    key: '/modal/context',
    link: '/modal/context',
    name: 'Context',
    children: ModalContext,
  },
  '/modal/createPortal': {
    key: '/modal/createPortal',
    link: '/modal/createPortal',
    name: 'createPortal',
    children: ModalCreatePortal,
  },
  '/modal/dialog': {
    key: '/modal/dialog',
    link: '/modal/dialog',
    name: 'HTML Dialog',
    children: ModalDialog,
  },
  '/popover': {
    key: '/popover',
    link: '/popover',
    name: '12. 팝오버',
    children: null,
  },
  '/imageSlide': {
    key: '/imageSlide',
    link: '/imageSlide',
    name: '13. 이미지 슬라이드',
    children: null,
  },
  '/carousel': {
    key: '/carousel',
    link: '/carousel',
    name: '14. 캐러셀',
    children: null,
  },
  '/gallery': {
    key: '/gallery',
    link: '/gallery',
    name: '15. 갤러리',
    children: null,
  },
  '/dropdown': {
    key: '/dropdown',
    link: '/dropdown/compound',
    name: '16. 드롭다운(셀렉트 박스)',
    children: [
      '/dropdown/compound',
      '/dropdown/headless',
      '/dropdown/headless-hook',
      '/dropdown/html-select',
    ],
  },
  '/dropdown/compound': {
    key: '/dropdown/compound',
    link: '/dropdown/compound',
    name: 'Compound',
    children: Dropdown1,
  },
  '/dropdown/headless': {
    key: '/dropdown/headless',
    link: '/dropdown/headless',
    name: 'Headless',
    children: Dropdown2,
  },
  '/dropdown/headless-hook': {
    key: '/dropdown/headless-hook',
    link: '/dropdown/headless-hook',
    name: 'Headless & Hook',
    children: Dropdown3,
  },
  '/dropdown/html-select': {
    key: '/dropdown/html-select',
    link: '/dropdown/html-select',
    name: 'HTML select',
    children: Dropdown4,
  },
  '/autoComplete': {
    key: '/autoComplete',
    link: '/autoComplete',
    name: '17. 자동 완성',
    children: null,
  },
  '/dnd': {
    key: '/dnd',
    link: '/dnd',
    name: '18. D&D 리스트',
    children: null,
  },
};

export const isParentRoute = (route: ROUTE): route is ParentRoute =>
  Array.isArray(route.children);

export const gnbRootList = (routes['/'] as ParentRoute).children.map(
  (r) => routes[r]
);
