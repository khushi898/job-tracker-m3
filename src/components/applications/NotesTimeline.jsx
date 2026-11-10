import { useState } from "react";

function NotesTimeline({notes,onAddNote}){
    const {text,setText}=useState("");

    function handleSubmit(event){
        event.preventDefault();
        if(text.trim()==="") return;
        onAddNote(text.trim());
        setText("");
    }
    const sortedNotes=[...notes].sort((a,b)=>b.date.localeCompare(a.date));
    return(
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Notes timeline</h2>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
                <input  
                  type="text"
                  value={text}
                  onChange={(event)=>setText(event.target.value)}
                  placeholder="e.g. Recruiter called,interview next week"
                  aria-label="New note"
                  className="flex-1 border rounded px-3 py-2"
                  />
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Note
                  </button>

            </form>

            {sortedNotes.length===0?(
                <p className="text-gray-500">No Notes yet. Add your first note above..</p>

            )
        :
        (
            <ul className="border-l-2 border-blue-200 pl-4 space-y-4">
                {sortedNotes.map((note)=>(
                    <li key={note.id}>
                        <p className="text-xs text-gray-500">
                            {new Date(note.date).toLocaleString("en-GB",{dateStyle:"medium",timeStyle:"short"}) }
                        </p>
                        <p>{note.text}</p>
                    </li>
                ))}
            </ul>
        )}
        </div>
    )
}
export default NotesTimeline;