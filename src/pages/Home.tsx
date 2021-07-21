import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  /** Add a new task to the list. */
  function handleAddTask(newTaskTitle: string) {
    // Check if the task title is already used
    const taskTitleExists = tasks.find((task) => task.title === newTaskTitle);
    if (taskTitleExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

    // Create new task
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  /** Mark/unmark a task as done/not done. */
  function handleToggleTaskDone(id: number) {
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  /** Remove a task from the list */
  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            setTasks((oldTasks) => oldTasks.filter((item) => item.id !== id));
          },
        },
        {
          text: "Não",
        },
      ]
    );
  }

  /** Edit an existing task. */
  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, title: taskNewTitle } : task
      )
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
