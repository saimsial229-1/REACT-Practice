import { useState } from "react";

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
    <div className="min-h-screen w-full flex-col mb-4 flex items-center justify-center bg-linear-to-br from-indigo-900 via-slate-900 to-blue-900">
      <form onSubmit={handleSubmit}>
        
        <div className="flex items-center flex-col text-white relative mt-6">
          <div className="flex flex-col w-64">

        <input
        className="peer order-2 border border-gray-300 rounded focus:outline-none transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-11 peer w-full"
          type="text"
          id="title"
          required
          placeholder="Please Enter"
          minLength={5}
          maxLength={50}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label htmlFor="title" className="transform order-1 peer-hover:shadow-lg transition-all duration-200 peer-hover:-translate-y-1 text-lg font-bold  text-blue-100 ">Title</label>

        </div>
        <br />
        <div className="flex flex-col w-64">
        <input
          className=" peer order-2 border border-gray-300 rounded transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 h-11 w-full [&::-webkit-calendar-picker-indicator]:invert-[1]"
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="date" className="transform order-1 font-bold text-lg peer-hover:-translate-y-1 peer-hover:shadow-lg transition-all duration-200">Date</label>
        </div>
        <br />
        {editId &&(
          <>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {STATUSES.map((stat) => (
            <option key={stat} value={stat}>
              {stat}
            </option>
          ))}
        </select>
        <br />
        
        </>
        
        )}
        
        <button  className={`transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 px-4 py-2 rounded-md font-bold w-30 ${
          editId 
          ? "bg-blue-600 hover:bg-blue-700 text-white" 
          : "bg-green-600 hover:bg-green-700 text-white" 
        }`}type="submit">
          {editId ? "Update" : "Submit"}
        </button>
        </div>
      </form>
        
      <div className="mt-5   text-white ">
        {data.map((item) => (
          <div key={item.id} style={{ marginBottom: "10px" }}>
           
            <b>{item.title}</b> — {item.date} [{item.status}]

            {updatedId === item.id && (
              <span className="bg-">  [Updated]</span>
            )}
            <div className="flex">
              
              <button
                className=" bg-blue-600 hover:bg-blue-700 text-white ml-10 w-20 border border-blue-900 rounded transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 mt-2"  
                disabled={item.status === "success"}
                onClick={() => {editItems(item) ; beingEdited()}}
              >
                {editId === item.id ? "Editing" : "Edit"}
              </button>
              <button className="bg-red-600 hover:bg-red-700 ml-4 w-20 mt-2 border border-red-900 rounded transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200" onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          </div>
          
        ))}
        </div>
      </div>
    
    
  );
}
