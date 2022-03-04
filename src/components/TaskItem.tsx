import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Task } from "./TasksList";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/editIcon.png";

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTile: string) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPossibleTitle, setNewPossibleTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewPossibleTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    if (!newPossibleTitle) {
      setNewPossibleTitle(task.title);
    }

    editTask(task.id, newPossibleTitle);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <ScrollView style={styles.taskTitleContainer}>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${task}`}
            style={!task.done ? styles.taskMarker : styles.taskMarkerDone}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={newPossibleTitle}
            onChangeText={setNewPossibleTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={!task.done ? styles.taskText : styles.taskTextDone}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.iconContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconSeparator} />

        <TouchableOpacity
          disabled={isEditing}
          testID={`trash-${index}`}
          style={{ opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTitleContainer: {
    paddingRight: 30,
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    paddingRight: 24,
    justifyContent: "space-between",
    width: 100,
  },
  iconSeparator: {
    width: 1,
    backgroundColor: "#DFDFDF",
  },
});
