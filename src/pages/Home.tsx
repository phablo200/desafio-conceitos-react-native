import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string) => {
    const existTask = tasks.some(task => task.title === title);
    if (existTask) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    const task = {
      id: new Date().getTime(),
      done: false,
      title,
    };

    setTasks(prev => [...prev, task]);    
  }

  function handleToggleTaskDone(id: number) {
    const newerTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, done: !task.done};
      }

      return task;
    });

    setTasks([...newerTasks]);
  }

  function handleRemoveTask(id: number) {
    console.log('remove task');
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item ?', [
      { text: 'Não' },
      {
        text: 'Sim',
        onPress: () => {
          const newerTasks = tasks.filter(task => task.id !== id);
          setTasks([...newerTasks]);
        }
      }
    ]);
  }

  function handleEditTask (id: number, newestTitle: string) {
    const newerTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, title: newestTitle };
      }

      return task;
    });

    setTasks([...newerTasks]);
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})