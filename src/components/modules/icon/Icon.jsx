import GetIcon from "./iconGetter";
 
// --- create icon component
function Icon({
  name,
  className,
}) {
  const Icon = GetIcon(name);
  return (
    <>
      {Icon && (
        <Icon
          className={`icon ${className || ""}`}
        />
      )}
    </>
  );
}

export default Icon;