import { useState } from "react";

import turkcell from "C:/Users/Monster/Desktop/turkcell-react/image/turkcell.jpg";
<img src={turkcell} alt="turkcell" />;

function ListGroup() {
  let items = ["Financell", "Paycell", "Tv Plus", "BİP", "KrediApi"];
  // Hook
  const [selectedIndex, setSelectedIndex] = useState(-1);

  //Event handler
  //const handleClick = (event: MouseEvent) => console.log(event);

  return (
    <>
      <h1>Turkcell Teknoloji</h1>
      {items.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
