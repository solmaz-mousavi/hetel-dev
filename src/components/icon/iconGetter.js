import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";

// ---- get icon dynamically from react-icons library
const GetIcon = ( icon ) => {
  const getIcon = (iconName) => {
    const iconsMap = new Map();
    iconsMap.set("Fa", FaIcons);
    iconsMap.set("Md", MdIcons);
    iconsMap.set("Tb", TbIcons);
    iconsMap.set("Bs", BsIcons);
    return iconsMap.get(iconName.substring(0, 2));
  };
  const icons = getIcon(icon);
  const TheIcon = icons[icon];
  return TheIcon;
};

export default GetIcon;