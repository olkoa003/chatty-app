import { useDispatch } from "react-redux";
import { deleteChat } from "../../store/chats/actions";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export const DeleteButton = ({ id }) => {
  const dispatch = useDispatch();

  const handleDeleteChat = () => {
    dispatch(deleteChat(id));
  };

  return <div onClick={handleDeleteChat}><DeleteRoundedIcon /></div>;
};