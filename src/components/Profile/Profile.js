import { connect, useDispatch, useSelector, shallowEqual } from "react-redux";
import { onValue, set } from "@firebase/database";
import { useEffect, useState } from "react";
import {
    changeShowName,
    changeName,
} from "../../store/profile/actions";
import { selectName, selectShowName } from "../../store/profile/selectors";
import { usePrev } from "../../utils/usePrev";
import { Form } from "../Form/Form";
import styles from './Profile.module.css';
import Button from '@mui/material/Button';
import { profileShowNameRef, getProfileNameRef, auth } from "../../services/firebase";

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
                {showName && <p>{name}</p>}
                <Button variant="contained" onClick={handleChangeShowName}>Change show name</Button>
            </div>
            <Form onSubmit={handleChangeName} />
        </>
    );
};

export const ProfileToConnect = () => {
    const [name, setName] = useState("");
    const [showName, setShowName] = useState(false);
  
    const handleChangeShowName = () => {
      // dispatch(changeShowName);
      // setShowName();
      set(profileShowNameRef, !showName);
    };
  
    const handleChangeName = (text) => {
      // dispatch(changeName(text));
      // setName(text);
      console.log(auth.currentUser);
      set(getProfileNameRef(auth.currentUser.uid), text);
    };
  
    // useEffect(() => {
    //   const unsubscribeName = onValue(profileNameRef, (snapshot) => {
    //     setName(snapshot.val());
    //   });
    //   const unsubscribeShowName = onValue(profileShowNameRef, (snapshot) => {
    //     setShowName(snapshot.val());
    //   });
  
    //   return () => {
    //     unsubscribeName();
    //     unsubscribeShowName();
    //   };
    // }, []);

    return (
        <>
            <h3 className={styles.profileTitle}>Profile</h3>
            <div className={styles.shownamebox}>
                {showName && <p className={styles.nameshow}>{name}</p>}
                <Button variant="contained" onClick={handleChangeShowName}>Show New Name</Button>
            </div>
            <div className={styles.fieldForName}>
                <Form placeholder="Pl" onSubmit={handleChangeName} />
            </div>
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