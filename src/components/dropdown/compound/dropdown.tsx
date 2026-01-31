import React, {
  createContext,
  KeyboardEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from '../cx';

type DropdownItemType = {
  id: string;
  text: string;
};
type DropdownProps = {
  items: DropdownItemType[];
  isOpen: boolean;
  selectedIndex: number;
  focusedIndex: number;
};
type DropdownDispatchProps = {
  setItems: React.Dispatch<SetStateAction<DropdownItemType[]>>;
  toggle: (force?: boolean) => void;
  selectIndex: React.Dispatch<SetStateAction<number>>;
  focusIndex: React.Dispatch<SetStateAction<number>>;
  handleKeydown: (e: KeyboardEvent) => void;
};

type KeyEventHandler = (
  e: KeyboardEvent,
  props: Pick<DropdownProps, 'focusedIndex' | 'items'> &
    Pick<DropdownDispatchProps, 'focusIndex' | 'selectIndex' | 'toggle'>
) => void;

const KeyEventMap: Partial<
  Record<KeyboardEvent<Element>['key'], KeyEventHandler>
> = {
  ArrowUp: (e, { focusIndex, items }) => {
    // focusIndex((prev) => Math.max(prev - 1, 0)); 최소값 제한
    focusIndex((prev) => (items.length + prev - 1) % items.length); // 순환
  },
  ArrowDown: (e, { focusIndex, items }) => {
    // focusIndex((prev) => Math.min(prev + 1, items.length - 1)); 최대값 제한
    focusIndex((prev) => (items.length + prev + 1) % items.length); // 순환
  },
  Enter: (e, { selectIndex, focusedIndex }) => {
    selectIndex(focusedIndex);
  },
  Escape: (e, { toggle }) => {
    toggle(false);
  },
};

const DropdownContext = createContext<DropdownProps>({
  items: [],
  isOpen: false,
  selectedIndex: -1,
  focusedIndex: -1,
});
const DropdownDispatchContext = createContext<DropdownDispatchProps>({
  setItems: () => {},
  toggle: () => {},
  selectIndex: () => {},
  focusIndex: () => {},
  handleKeydown: () => {},
});

const useDropdown = () => useContext(DropdownContext);
const useSetDropdown = () => useContext(DropdownDispatchContext);

const DropdownContextProvider = ({
  list,
  children,
}: {
  list: DropdownItemType[];
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<DropdownItemType[]>(list);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focusedIndex, focusIndex] = useState<number>(-1);
  const [selectedIndex, selectIndex] = useState<number>(-1);

  const toggle = (force?: boolean) => {
    setIsOpen((prev) => (typeof force === 'boolean' ? force : !prev));
  };

  const handleKeydown = (e: KeyboardEvent) => {
    const { key } = e;
    const handler = KeyEventMap[key];
    if (handler) {
      handler(e, { items, focusedIndex, focusIndex, selectIndex, toggle });
    }
  };

  return (
    <DropdownContext.Provider
      value={{
        items,
        isOpen,
        selectedIndex,
        focusedIndex,
      }}
    >
      <DropdownDispatchContext.Provider
        value={{
          setItems,
          toggle,
          focusIndex,
          selectIndex,
          handleKeydown,
        }}
      >
        {children}
      </DropdownDispatchContext.Provider>
    </DropdownContext.Provider>
  );
};

const DropdownContainer = ({ children }: { children: React.ReactNode }) => {
  const { handleKeydown } = useSetDropdown();

  return (
    <div className={cx('Dropdown')} onKeyDown={handleKeydown}>
      {children}
    </div>
  );
};

const DropdownTrigger = () => {
  const { selectedIndex, items } = useDropdown();
  const { toggle } = useSetDropdown();
  const selectedItem = items[selectedIndex];

  return (
    <button className={cx('button-toggle')} onClick={() => toggle()}>
      <span className={cx('text')}>
        {selectedItem?.text || '항목을 선택하세요'}
      </span>
    </button>
  );
};

const DropdownItem = ({
  item,
  index,
  itemsRef,
}: {
  itemsRef: React.MutableRefObject<(HTMLLIElement | null)[]>;
  item: DropdownItemType;
  index: number;
}) => {
  const { selectedIndex, focusedIndex } = useDropdown();
  const { selectIndex } = useSetDropdown();
  return (
    <li
      className={cx('item')}
      role="option"
      aria-selected={selectedIndex === index}
      aria-current={focusedIndex === index}
      ref={(r) => {
        if (itemsRef) itemsRef.current[index] = r;
      }}
    >
      <button onClick={() => selectIndex(index)}>{item.text}</button>
    </li>
  );
};

const DropdownList = () => {
  const { items, isOpen, focusedIndex } = useDropdown();
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    itemsRef.current[focusedIndex]?.scrollIntoView({
      block: 'nearest', // 가장 가까운 곳으로 옮기기
    });
  }, [focusedIndex]);

  if (!isOpen) return null;

  return (
    <ul role="listbox" className={cx('DropdownList')}>
      {items.map((item, i) => (
        <DropdownItem item={item} key={item.id} index={i} itemsRef={itemsRef} />
      ))}
    </ul>
  );
};

const Dropdown = {
  Provider: DropdownContextProvider,
  Container: DropdownContainer,
  Trigger: DropdownTrigger,
  List: DropdownList,
  Item: DropdownItem,
};

export default Dropdown;
