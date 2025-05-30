import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";

const Item = ({ design, delete_design, type }) => {
  return (
    <div className={`relative group w-full ${type ? "h-[100px]" : "h-[170px] px-2"}`}>
      <Link
        to={`/design/${design._id}/edit`}
        className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? '' : 'p-4'}`}
      >
        <img
          className="w-full h-full rounded-md overflow-hidden object-cover"
          src={design.image_url}
          alt=""
        />
      </Link>

      <div
        onClick={() => delete_design(design._id)}
        className="absolute hidden cursor-pointer top-1 right-2 text-red-500 p-2 transition-all duration-500 group-hover:block"
      >
        <FaTrashAlt />
      </div>
    </div>
  );
};

export default Item;

