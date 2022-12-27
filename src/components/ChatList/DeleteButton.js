import { useDispatch } from "react-redux";
import { set } from "@firebase/database";
import { deleteChat } from "../../store/chats/actions";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { getChatsRefById } from "../../services/firebase";

export const DeleteButton = ({ id }) => {
  //const dispatch = useDispatch();

  const handleDeleteChat = () => {
    //dispatch(deleteChat(id));
    set(getChatsRefById(id), null);
  };

  return <div onClick={handleDeleteChat}><DeleteRoundedIcon /></div>;
};