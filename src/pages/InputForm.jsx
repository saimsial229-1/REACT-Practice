import { useState } from "react";

import TodoList from "../cssComponents/ButtonComponent"

const STATUSES = ["pending", "success", "failed"];

export default function FormData() {
  const todayString = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(todayString);
  const [editId, setEditId] = useState(null);
  const [data, setData] = useState([]);
  const [updatedId, setUpdatedId] = useState(null);
  const [status, setStatus] = useState(STATUSES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (date < todayString && !editId) {
      alert("Please select today's date or future date");
      return;
    }

    if (editId) {
      const updatedItems = data.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            title,
            date,
            status,
          };
        }
        return item;
      });

      setData(updatedItems);
      setUpdatedId(editId);
      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),
        title,
        date,
        status,
      };

      setData((prev) => [...prev, newItem]);
    }

    setTitle("");
    setDate(todayString);
    setStatus(STATUSES[0]);
  };

  const editItems = (item) => {
    setTitle(item.title);
    setDate(item.date);
    setStatus(item.status);
    setEditId(item.id);
  };

  const deleteItem = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
  };

  return (


    <div className="h-screen flex-col flex items-center justify-start bg-white">
      <div className="relative w-full h-40 bg-[#9395D3] ">

        <div className="text-white absolute top-1/2 left-10 font-semibold text-2xl">
          <h1>
            Todo App

          </h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>

        <div className="flex items-center flex-col text-white relative mt-6">
          <div className="relative z-0">

            <input
              className="mt-12 block py-1 px-2 w-full text-[#8B8787] text-heading bg-transparent border-0 border-b-2 appearance-none focus:outline-none  peer"
              type="text"
              id="title"
              required
              placeholder=""
              minLength={5}
              maxLength={50}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="title" className="mt-10 absolute text-base text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:inset-s-0 peer-focus:text-fg-brand peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#8B8787]">Title</label>

          </div>
          <br />
          <div className="flex flex-col w-64">
            <div className="relative z-0">

              <input

                className=" ml-5 mt-11 block py-1 w-55 text-[#8B8787] text-heading bg-transparent border-0 border-b-2 appearance-none focus:outline-none  peer"
                type="date"
                required
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="date" className="mt-10 ml-5 absolute text-base text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:inset-s-0 peer-focus:text-fg-brand peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 text-[#8B8787]">Date</label>
            </div>
          </div>
          <br />
          {editId && (
            <div className="text-black mb-6">
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                {STATUSES.map((stat) => (
                  <option key={stat} value={stat}>
                    {stat}
                  </option>
                ))}
              </select>
              <br />

            </div>

          )}

          <button className={`transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 px-4 py-2 rounded-md font-bold w-30 ${editId
            ? "bg-[#9395D3] hover:bg-[#9395D3] text-white"
            : "bg-[#9395D3] hover:bg-[#9395D3] text-white"
            }`} type="submit">
            {editId ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      <div className="mt-5   text-black ">
        {data.map((item, i) =>
        (<TodoList
          key={i}
          item={item}
          editItems={editItems}
          beingEdited={() => console.log("Editing")}
          editId={editId}
          deleteItem={deleteItem}
          updatedId={updatedId}
        />)


        )}
      </div>
    </div>


  );
}
