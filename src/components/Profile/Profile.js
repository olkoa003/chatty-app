import { useDispatch, useSelector } from "react-redux";
import { changeShowName, CHANGE_NAME } from "../../store/profile/actions";
import { Form } from "../Form/Form";

export const Profile = () => {
    const dispatch = useDispatch();
    const { showName, name } = useSelector((state) => state);

    const handleChangeShowName = () => {
        dispatch(changeShowName);
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
                <input type="checkbox" />
                <button onClick={handleChangeShowName}>Change show name</button>
            </div>
            <Form onSubmit={handleChangeName} />
        </>
    );
};