import { Link } from "react-router-dom";

const PlacesCard = ({ image, title, name, desc, buttonText }) => {
  return (
    <div className="w-[410.67px] h-[480px] flex flex-col justify-start gap-2 dealsShadow rounded-b">
      <div className="w-full h-[397px]">
        <img
          src={image}
          alt="images"
          className="w-full h-full object-cover rounded-t"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-start gap-1 px-4">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-[#6E7491] text-base font-medium capitalize">
            {title} <span className="text-[#605DEC]">{name}</span>
          </h1>
        </div>
        <p className="text-[#7C8DB0] text-sm font-normal">{desc}</p>
        {buttonText && (
          <Link to="/">
            <button className="bg-[#605DEC] text-[#FAFAFA] px-4 py-2 mt-3 rounded-md hover:bg-[#54cdb7] transition-all duration-200">
              {buttonText}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PlacesCard;
