interface CustomButtonProps {
  label: string;
  onClick: (e?:any) => void;
  type: "error" | "info" | "success" | "magenta";
  lading?: boolean
}
export default function CustomButton(props: CustomButtonProps) {
  const { onClick, label, type, lading } = props;
  return (
    <>
      {type == "info" && (
        <button
          onClick={() => onClick()}
          className="bg-blue-500 text-sm hover:bg-blue-600 
            text-white font-regular py-2 px-4 rounded w-full"
        >
          {label}
        </button>
      )}
      {type == "error" && (
        <button
          onClick={() => onClick()}
          className="bg-red-500 text-sm hover:bg-red-600 
            text-white font-regular py-2 px-4 rounded w-full"
        >
          {label}
        </button>
      )}
      {type == "success" && (
        <button
          onClick={() => onClick()}
          className="bg-green-500 text-sm hover:bg-green-600 
            text-white font-regular py-2 px-4 rounded w-full"
        >
          {lading?"loading...":label}
        </button>
      )}
      {type == "magenta" && (
        <button
          onClick={() => onClick()}
          className="bg-gigas-500 text-sm hover:bg-gigas-700 
            text-white font-regular py-2 px-4 rounded w-full"
        >
          {label}
        </button>
      )}
    </>
  );
}
