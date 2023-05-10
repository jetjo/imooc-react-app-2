import { list } from "@/api/user";
import reducer from "@/model/robots";

type Dispatch = (value: Parameters<typeof reducer>[1]) => void;

async function getUsers(dispatch: Dispatch) {
  const data = await list();
  Array.isArray(data?.data) && dispatch({ type: "Assign", data: data.data });
}

export default getUsers;
