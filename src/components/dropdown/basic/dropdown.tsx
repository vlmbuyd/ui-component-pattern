import {
  createContext,
  KeyboardEvent,
  SetStateAction,
  useContext,
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
        }}
      >
        {children}
      </DropdownDispatchContext.Provider>
    </DropdownContext.Provider>
  );
};

const DropdownContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx('Dropdown')}>{children}</div>;
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
}: {
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
    >
      <button onClick={() => selectIndex(index)}>{item.text}</button>
    </li>
  );
};

const DropdownList = () => {
  const { items, isOpen } = useDropdown();

  if (!isOpen) return null;

  return (
    <ul role="listbox" className={cx('DropdownList')}>
      {items.map((item, i) => (
        <DropdownItem item={item} key={item.id} index={i} />
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
