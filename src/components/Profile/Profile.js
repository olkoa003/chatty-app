import { connect, useDispatch, useSelector, shallowEqual } from "react-redux";
import { logout } from "../../services/firebase";
import {
  changeShowName,
  CHANGE_NAME,
  changeName,
} from "../../store/profile/actions";
import { selectName, selectShowName } from "../../store/profile/selectors";
import { usePrev } from "../../utils/usePrev";
import { Form } from "../Form/Form";

export const Profile = () => {
  const dispatch = useDispatch();
  // const { showName, name } = useSelector((state) => state);
  const showName = useSelector(selectShowName, shallowEqual);
  const name = useSelector(selectName);

  const handleChangeShowName = () => {
    dispatch(changeShowName);
  };

  const handleChangeName = (text) => {
    dispatch(changeName(text));
  };

  return (
    <>
      <h3>Profile</h3>
      <div>
        {showName && <span>{name}</span>}
        <input type="checkbox" />
        <button onClick={handleChangeShowName}>Change show name</button>
      </div>
      <Form onSubmit={handleChangeName} />
    </>
  );
};

export const ProfileToConnect = ({ showName, name, setName, setShowName }) => {
  const handleChangeShowName = () => {
    // dispatch(changeShowName);
    setShowName();
  };

  const prevShowName = usePrev(showName);

  console.log(prevShowName, showName);

  const handleChangeName = (text) => {
    // dispatch(changeName(text));
    setName(text);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <h3>Profile</h3>
      <div>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
      <div>
        {showName && <span>{name}</span>}
        <input type="checkbox" />
        <button onClick={handleChangeShowName}>Change show name</button>
      </div>
      <Form onSubmit={handleChangeName} />
    </>
  );
};

const mapStateToProps = (state) => ({
  showName: selectShowName(state),
  name: selectName(state),
});

const mapDispatchToProps = {
  setShowName: () => changeShowName,
  setName: changeName,
};

const ConnectedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileToConnect);
export default ConnectedProfile;