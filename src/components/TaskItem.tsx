import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'


export interface Task {
  id: number;
  title: string;
  done: boolean;
};

interface TaskItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newestTitle: string) => void;
};

export function TaskItem ({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);
  // Continuar implementando...

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setTitle(item.title);
    setIsEditing(false);
  };

  const handleSubmitEditing = () => {
    editTask(item.id, title);
    setIsEditing(false);
  };

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone :styles.taskMarker} 
          >
            { item.done && (
              <Icon name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput style={item.done ? styles.taskTextDone : styles.taskText} 
            value={title}
            onChangeText={setTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
            

      <View style={styles.iconsContainer}>
        {
          isEditing ? (
            <TouchableOpacity onPress={handleCancelEditing}>
              <Icon name="x" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleStartEditing}>
              <Icon name="edit-2" />
            </TouchableOpacity>
          )
        }
        
        <View style={styles.iconsDivider} />
        
        <TouchableOpacity
          disabled={isEditing}
          testID={`trash-${index}`}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    paddingRight: 30,
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconsDivider: {
    width: 1,
    color: 'rgba(196, 196, 196, 0.24)'
  }
});