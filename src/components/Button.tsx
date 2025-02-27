
interface Props {
  children: string;
  color: string;
  onClick: () => void;
}

const Button = ({ children, onClick, color }: Props) => {
  return (
    <button className={"bg-blue-500 text-white px-4 py-2 rounded-lg  hover:bg-blue-500 hover:text-gray-900 btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
