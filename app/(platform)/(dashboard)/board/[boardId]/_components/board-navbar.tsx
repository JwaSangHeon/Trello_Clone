import { Board } from "@prisma/client";
import BoardTitleForm from "./board-title-form";

interface BoardNavbarProps {
  data: Board;
}

const BoardNavbar = ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] flex items-center px-6 text-white gap-x-4 fixed top-14 bg-black/50">
      <BoardTitleForm data={data} />
    </div>
  );
};

export default BoardNavbar;
