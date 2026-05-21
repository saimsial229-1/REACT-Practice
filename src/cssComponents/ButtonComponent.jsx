import FormData from "../pages/InputForm";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
const TodoList = ({ item, editItems, beingEdited, editId, deleteItem, updatedId }) => {

    
    return (
        <div key={item.id} className="mt-2.5">
        
                      <b>{item.title}</b> — {item.date} [{item.status}]
        
                      {updatedId === item.id && (
                        <span className="">  [Updated]</span>
                      )}
        
        <div className="flex justify-center mt-4">

            <div className="relative group inline-flex">
                <button
                    className="text-[#B3B7EE] transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                    disabled={item.status === "success"}
                    onClick={() => {
                        editItems(item);
                        beingEdited();
                    }}
                >
                    <Pencil />
                </button>

                {/* Tooltip */}
                <span className="absolute bottom-full mb-1 hidden group-hover:block text-[#8B8787] text-xs px-2  rounded whitespace-nowrap">
                    {editId === item.id ? "Editing" : "Edit"}
                </span>


            </div>
            <div className="relative group inline-flex ml-7">
                <button className="text-[#B3B7EE] transform hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ml-7" onClick={() => deleteItem(item.id)}><Trash2 />
                </button>
                <span className="ml-4 absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#8B8787] text-xs px-2 rounded whitespace-nowrap">
                    Delete
                </span>
            </div>
        </div>
        </div>


    )

}

export default TodoList;

