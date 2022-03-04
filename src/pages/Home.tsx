import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskAlreadyExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

      return;
    }

    const newTask: Task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle,
    };

    setTasks((prevState) => [...prevState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remove item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () =>
            setTasks((prevState) => prevState.filter((task) => task.id !== id)),
        },
        {
          text: "Não",
        },
      ]
    );
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          return { ...task, title: taskNewTitle };
        }
        return task;
      })
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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
