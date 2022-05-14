import { Box, Checkbox, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Store } from "../../../Context/Store";
import VewTask from "../../VewTask/VewTask";
import "./task.scss";
function TaskTable() {
  const { tasks } = Store();
  return (
    <div>
      <VStack spacing={4} align="stretch">
        {tasks.length>0 && tasks.map((task) => {
          return (
            <div key={task._id}>
              <VewTask task={task}>
                <Box
                  color={task.status === "active" ? "white" : "black"}
                  bgColor={task.status === "active" ? "#36a886" : "#dfe2e8"}
                  className="task"
                >
                  <Text fontWeight={"bold"} fontSize="18px" width={"65%"}>
                    {task.title}
                  </Text>
                  <Text>{task.date}</Text>
                  <Text>{task.time}</Text>
                </Box>
              </VewTask>
            </div>
          );
        })}
      </VStack>
    </div>
  );
}

export default TaskTable;
