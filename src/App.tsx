import { useState } from "react";
import { Status, statuses, Task } from "./utils/data-tasks";
import { data } from "./data.js";
import styled from '@emotion/styled'
import Card from '@mui/material/Card';
function App() {

  const [tasks, setTasks] = useState<Task[]>(data);
  const columns = statuses.map((status) => {
    const taskInColumns = tasks.filter((task) => task.status === status);
    return {
      status,
      taskInColumns,
    };
  });
  const handleDragEnter = (status: Status) => {
  };
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    status: Status,
    item: any
  ) => {
    // console.log({
    //   e,
    //   status,
    //   item
    // });
    const droppedItemId = e.dataTransfer.getData("itemId");
    console.log("Dropped item ID:", { droppedItemId });
    const itemone = tasks.filter((el) => el.id === droppedItemId)[0];
    itemone.status = status;
    console.log({ itemone, status });
    setTasks([...tasks]);
  };

  return (
    <>
      <Canvas>
        {columns.map((el) => (
          <div
            onDrop={(e) => handleDrop(e, el.status, el)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => handleDragEnter(el.status)}
          >
            <Button>{el.status}</Button>
            <div>
              {el.taskInColumns.map((el) => (
                <CardComponent
                  draggable
                  onDragStart={(e) => {
                    console.log({ el });

                    e.dataTransfer.setData("itemId", el.id);
                  }}
                >
                  <h4>{el.title}</h4>
                </CardComponent>
              ))}
            </div>
          </div>
        ))}
      </Canvas>
    </>
  );
}
const Button = styled.button`
  color: orange;
`
const Canvas = styled.div`
          display:flex;
          gap: 1rem;
          width:100vw;
          height: 100vh;
          padding:0;
          justify-content:center;
`;
const CardComponent =styled(Card)`
  background-color: rgba(255,255,255,0.1);
  padding:1rem;
  margin-bottom:.5rem;
  color: white;
  cursor:drag;
`
export default App;
