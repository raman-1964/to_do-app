import React, { useEffect, useState } from 'react';
import Items from './Items';

const getLocalData = () => {
  const fst = localStorage.getItem("mytodo");

  if (fst) return JSON.parse(fst);
  return [];
}

function App() {

  const [list, setList] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [edit, setEdit] = useState(-1);
  const [toggle, setToggle] = useState(false);

  const inputEvent = (e) => {
    setList(e.target.value);
  }

  const listOfItems = () => {
    if (!list) alert("plzz fill data first.")
    else if (list && toggle) {
      setItems(items.map((cur) => {
        if (cur.id === edit)
          return { ...cur, nameItem: list }
        return cur
      }))
    }
    else {
      setItems((pre) => {
        const date = new Date().getTime();
        const cur = {
          id: date,
          nameItem: list
        }
        return [...pre, cur];
      });
    }

    setList("");
    setEdit(-1);
    setToggle(false);
  }

  const editItem = (id) => {
    const item_edited = items.find((cur) => {
      return cur.id === id;
    });
    setEdit(id);
    setToggle(true);
    setList(item_edited.nameItem);
  }

  const deleteItem = (id) => {
    console.log(id);
    setItems((pre) => {
      return pre.filter((cur, ind) => {
        return cur.id !== id;
      })
    })
  }

  useEffect(() => {
    localStorage.setItem("mytodo", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="container">
          <h2>ToDo List App</h2>
          <div className="input">
            <input type="text" placeholder="add item" value={list} onChange={inputEvent} />
            <button onClick={listOfItems}> {toggle ? <i className="fa fa-pencil-square-o" aria-hidden="true" style={{fontSize:"1.5rem",
            background:"none",
            color:"whitesmoke",
            borderRadius:"50%"}}></i> : "+"} </button>
          </div>
          <ul >
            <li>
              {items.map((cur, ind) => {
                return (<Items
                  key={ind}
                  id={cur.id}
                  text={cur.nameItem}
                  onDelete={deleteItem}
                  onEdit={editItem}
                />);
              })}
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App;
