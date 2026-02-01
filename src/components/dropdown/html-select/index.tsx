import cx from '../cx';
import data from '../data';

const Dropdown4 = () => {
  return (
    <>
      <h3>#4. HTML select</h3>

      <select name="dropdown5" className={cx('selectbox')}>
        {data.map(({ id, text }) => (
          <option value={text} key={id}>
            {text}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown4;
