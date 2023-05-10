import { list } from "@/api/user";
import reducer from "@/model/robots";

type Item = Parameters<typeof reducer>[0][0];

type Dispatch = (value: {
  type: Parameters<typeof reducer>[1]["type"];
  id?: number;
  data?: Item | Item[];
}) => void;

async function getUsers(dispatch: Dispatch) {
  const data = await list();
  Array.isArray(data?.data) && dispatch({ type: "Assign", data: data.data });
}

export default getUsers;
