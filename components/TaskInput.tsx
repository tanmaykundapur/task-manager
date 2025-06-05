import {
  Button,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: () => void;
}

// Text Input Field
export default function TaskInput({ value, onChangeText, onAdd }: Props) {
  return (
    <TouchableOpacity onPress={onAdd} activeOpacity={0.8}>
      <View style={styles.dashedWrapper}>
        <Text style={styles.plusSign}>＋</Text>
        <Text style={styles.addNew}>Add New Task</Text>
      </View>
      <View style={styles.actualInput}>
        <TextInput
          style={styles.inputField}
          value={value}
          onChangeText={onChangeText}
          placeholder="Enter a task"
          returnKeyType="done"
          onSubmitEditing={onAdd}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dashedWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 20,
    width: "100%",
    maxWidth: 320,
  },
  plusSign: {
    fontSize: 24,
    color: "#5758FF",
    marginRight: 8,
  },
  addNew: {
    fontSize: 16,
    color: "#5758FF",
    fontWeight: "600",
  },
  actualInput: {
    marginTop: 0,
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});
