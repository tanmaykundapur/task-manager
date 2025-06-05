import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({
  text,
  completed,
  onToggle,
  onDelete,
}: Props) {
  return (
    <View style={[styles.container, completed && styles.containerCompleted]}>
      {/** Task Card    **/}
      <TouchableOpacity onPress={onToggle} style={styles.leftSection}>
        {completed ? (
          <Text style={styles.icon}>✅</Text> // Check mark if Completed
        ) : (
          <Text style={styles.icon}>◻️</Text> // Blank if Not Completed
        )}
        <Text
          style={[styles.taskText, completed && styles.textCompleted]}
          numberOfLines={1}
        >
          {text}
        </Text>
      </TouchableOpacity>

      {/** Delete Button    **/}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>DELETE</Text>
      </TouchableOpacity>
    </View>
  );
}

// Style Sheet
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    width: "100%",
    maxWidth: 320,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  containerCompleted: {
    backgroundColor: "#E8F5E9",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  taskText: {
    fontSize: 16,
    color: "#333333",
  },
  textCompleted: {
    textDecorationLine: "line-through",
    color: "#999999",
  },
  deleteButton: {
    backgroundColor: "#D63031",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 12,
  },
  deleteText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
