import { ThreeDots } from 'react-loader-spinner';

function Loader({ visible }) {
  return (
    <ThreeDots
      visible={visible}
      height="40"
      width="80"
      color="#ff4081"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ justifyContent: 'center' }}
    />
  );
}

export default Loader;
