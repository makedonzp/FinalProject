import { useDispatch } from "react-redux";
import { setAuth } from "../storage/actions";

export default function CheckTokenWithoutNavigate() {
    const dispatch = useDispatch();

    const now = new Date();
    const expire = new Date(localStorage.getItem("expire"));

    dispatch(setAuth(now < expire));
}