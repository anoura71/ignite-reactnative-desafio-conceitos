import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { Task } from "./TasksList";

import penIcon from "../assets/icons/pen/pen.png";
import trashIcon from "../assets/icons/trash/trash.png";

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  editTask,
  removeTask,
}: TaskItemProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  /** Initiate edition of the task title. */
  function handleStartEditing() {
    setIsBeingEdited(true);
  }

  /** Cancel the edition of the task title. */
  function handleCancelEditing() {
    setTaskTitle(task.title);
    setIsBeingEdited(false);
  }

  /** Confirm the edition of the task title. */
  function handleSubmitEditing() {
    editTask(task.id, taskTitle);
    setIsBeingEdited(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited) {
        // Focus on the edited title
        textInputRef.current.focus();
      } else {
        // Focus off the title
        textInputRef.current.blur();
      }
    }
  }, [isBeingEdited]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={taskTitle}
            editable={isBeingEdited}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
            onChangeText={setTaskTitle}
            onSubmitEditing={handleSubmitEditing}
            onBlur={handleCancelEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isBeingEdited ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          testID={`trash-${index}`}
          // style={{ paddingHorizontal: 24 }}
          style={{ opacity: isBeingEdited ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
          disabled={isBeingEdited}
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
  taskText: {
    color: "#666",
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
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    color: "rgba(196, 196, 196, 0.24)",
  },
});
