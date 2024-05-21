import { ListWithCard } from "@/types";
import ListHeader from "./list-header";

interface ListItemProps {
  index: number;
  data: ListWithCard;
}

const ListItem = ({ index, data }: ListItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md shadow-md bg-[#f1f2f4] p-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};

export default ListItem;
