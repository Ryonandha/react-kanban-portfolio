// src/App.jsx
import { useState, useEffect } from "react"; // <-- Cukup satu baris ini saja
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Trash2, GripVertical } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// Data awal (State Awal)
const initialData = [
  {
    id: "todo",
    title: "To Do 📝",
    tasks: [
      { id: "1", content: "Belajar React Dasar" },
      { id: "2", content: "Install Library DnD" },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress 🚧",
    tasks: [{ id: "3", content: "Membuat Komponen Card" }],
  },
  {
    id: "done",
    title: "Done ✅",
    tasks: [],
  },
];

function App() {
  const [columns, setColumns] = useState(() => {
    const savedData = localStorage.getItem("kanban-board-data");
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanban-board-data", JSON.stringify(columns));
  }, [columns]);

  // Fungsi saat Drag Selesai
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // 1. Jika dijatuhkan di luar area
    if (!destination) return;

    // 2. Jika dijatuhkan di tempat yang sama persis
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Cari index kolom asal dan tujuan
    const sourceColIndex = columns.findIndex((col) => col.id === source.droppableId);
    const destColIndex = columns.findIndex((col) => col.id === destination.droppableId);

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    // LOGIKA A: Pindah di kolom yang SAMA (Reordering)
    if (sourceCol.id === destCol.id) {
      const newTasks = Array.from(sourceCol.tasks);
      const [movedTask] = newTasks.splice(source.index, 1); // Hapus dari lama
      newTasks.splice(destination.index, 0, movedTask); // Masukkan ke baru

      const newColumns = [...columns];
      newColumns[sourceColIndex] = { ...sourceCol, tasks: newTasks };
      setColumns(newColumns);
    }
    // LOGIKA B: Pindah ke kolom BEDA
    else {
      const sourceTasks = Array.from(sourceCol.tasks);
      const destTasks = Array.from(destCol.tasks);

      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      const newColumns = [...columns];
      newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      newColumns[destColIndex] = { ...destCol, tasks: destTasks };
      setColumns(newColumns);
    }
  };

  // Fungsi Tambah Task Baru
  const addTask = (colId) => {
    const text = prompt("Masukkan nama tugas:");
    if (!text) return;

    const newColumns = columns.map((col) => {
      if (col.id === colId) {
        return {
          ...col,
          tasks: [...col.tasks, { id: uuidv4(), content: text }],
        };
      }
      return col;
    });
    setColumns(newColumns);
  };

  // Fungsi Hapus Task
  const deleteTask = (colId, taskId) => {
    const newColumns = columns.map((col) => {
      if (col.id === colId) {
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== taskId),
        };
      }
      return col;
    });
    setColumns(newColumns);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>My Kanban Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container">
          {columns.map((column) => (
            <div key={column.id} className="column">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>{column.title}</h2>
                <span style={{ fontSize: "12px", color: "#666" }}>{column.tasks.length}</span>
              </div>

              {/* Area yang bisa dijatuhi (Droppable) */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: "100px",
                      background: snapshot.isDraggingOver ? "#e3e4e6" : "transparent",
                      transition: "background 0.2s",
                      borderRadius: "4px",
                    }}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-card"
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.8 : 1,
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <GripVertical size={16} color="#ccc" />
                              {task.content}
                            </div>
                            <button onClick={() => deleteTask(column.id, task.id)} style={{ border: "none", background: "none", cursor: "pointer", color: "#ff5555" }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <button
                onClick={() => addTask(column.id)}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "10px",
                  background: "transparent",
                  border: "1px dashed #999",
                  cursor: "pointer",
                }}
              >
                + Add Task
              </button>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
