import data from '../data';
import Dropdown from './dropdown';

export const Dropdown1 = () => {
  return (
    <article>
      <h3>#1. Compound Component</h3>
      <Dropdown.Provider list={data}>
        <Dropdown.Container>
          <Dropdown.Trigger></Dropdown.Trigger>
          <Dropdown.List></Dropdown.List>
        </Dropdown.Container>
      </Dropdown.Provider>
    </article>
  );
};
