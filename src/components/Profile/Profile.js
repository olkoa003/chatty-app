import { changeShowName, CHANGE_NAME, VIEW_CHECKBOX } from "../../store/profile/actions";
import { useDispatch, useSelector, shallowEqual  } from "react-redux";
import { Form } from "../Form/Form";
import styles from "./Profile.module.css";
import { Button } from "@mui/material";
import { selectName, selectShowName } from "../../store/profile/selectors";
// import { usePrev } from "../../utils/usePrev";

export const Profile = () => {
    const dispatch = useDispatch();
    // const { showName, name } = useSelector((state) => state);

    const showName = useSelector(selectShowName, shallowEqual);
    const name = useSelector(selectName);

    const handleChangeShowName = () => {
        dispatch(changeShowName);
    };

    const changeCheckbox = () => {
        dispatch({
            type: VIEW_CHECKBOX
        });
    };

    const handleChangeName = (text) => {
        dispatch({
            type: CHANGE_NAME,
            payload: text,
        });
    };

    return (
        <>
            <h3>Profile</h3>
            <div>
                {showName && <span>{name}</span>}
                <input type="checkbox" onChange={changeCheckbox} />
                <Button variant="contained" onClick={handleChangeShowName}>Change show name</Button>
            </div>
            <Form onSubmit={handleChangeName} className={styles.inputField} />
        </>
    );
};


// export const ProfileToConnect = ({ showName, name, setName, setShowName }) => {
  
//     const handleChangeShowName = () => {
//       setShowName();
//     };

//     const changeCheckbox = () => {
//         dispatch({
//             type: VIEW_CHECKBOX
//         });
//     };

//     const prevShowName = usePrev(showName);
  
//     console.log(prevShowName, showName);
  
//     const handleChangeName = (text) => {
//       setName(text);
//     };
  
//     return (
//       <>
//         <h3>Profile</h3>
//         <div>
//           {showName && <span>{name}</span>}
//           <input type="checkbox" onChange={changeCheckbox} />
//           <button onClick={handleChangeShowName}>Change show name</button>
//         </div>
//         <Form onSubmit={handleChangeName} />
//       </>
//     );
//   };
  
//   const mapStateToProps = (state) => ({
//     showName: selectShowName(state),
//     name: selectName(state),
//   });
  
//   const mapDispatchToProps = {
//     setShowName: () => changeShowName,
//     setName: changeName,
//   };
  
//   const ConnectedProfile = connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(ProfileToConnect);
//   export default ConnectedProfile;