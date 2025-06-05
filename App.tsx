import React, { useState } from "react";
import {
  TextInput,
  Button,
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import { StatusBar } from "expo-status-bar";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add New Task
  const addTask = () => {
    // Remove Whitespace
    const trimmed = taskText.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: trimmed,
        completed: false,
      },
    ]);
    setTaskText("");
  };

  // Toggle Complete (Strike through Task)
  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete Task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // count pending vs completed:
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  // calculate progress percentage:
  const progressPercent =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" backgroundColor="#fff" />
      <View style={styles.mainContainer}>
        <View style={styles.card}>
          {/* ─────── Header ─────── */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Task Manager</Text>
            <Text style={styles.headerSubtitle}>
              {pendingCount} pending, {completedCount} completed
            </Text>
          </View>

          {/* ─────── Task List ─────── */}
          <View style={styles.container}>
            <TaskInput
              value={taskText}
              onChangeText={setTaskText}
              onAdd={addTask}
            />
            {/* If NO TASKS -> SHOW MESSAGE */}
            {tasks.length === 0 ? (
              <View style={styles.emptyWrapper}>
                <Text style={styles.emptyText}>No tasks yet</Text>
              </View>
            ) : (
              <>
                {/* Used FlatList to display all task items */}
                <FlatList
                  data={tasks}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TaskItem
                      text={item.text}
                      completed={item.completed}
                      onToggle={() => toggleComplete(item.id)}
                      onDelete={() => deleteTask(item.id)}
                    />
                  )}
                  contentContainerStyle={{
                    alignItems: "center", // centers each TaskItem horizontally
                    paddingBottom: 8,
                  }}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
          </View>

          {/* ─────── Footer ─────── */}
          {/* Show Total/Progress Bar + Message when all tasks completed  */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Total: {tasks.length}</Text>
            <Text style={styles.footerText}>Progress: {progressPercent}%</Text>
            {tasks.length > 0 && completedCount === tasks.length && (
              <Text style={styles.allDone}>✔️ All tasks completed! 🎉</Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F3FF",
  },
  mainContainer: {
    width: "90%",
    maxWidth: 360,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    // iOS shadow:
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow:
    elevation: 3,
  },
  header: {
    backgroundColor: "#5758FF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#E0E0E0",
    marginTop: 4,
    fontSize: 14,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  // “No tasks yet” wrapper
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },

  // FlatList content container: center each TaskItem
  listContent: {
    alignItems: "center",
    paddingVertical: 10,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#555",
  },
  allDone: {
    marginTop: 8,
    color: "#2ECC71",
    fontSize: 16,
    fontWeight: "600",
  },
});
