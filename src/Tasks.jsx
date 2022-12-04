import React from 'react'
import {
    Button,
    Text,
    Title,
    Modal,
    TextInput,
    Group,
    Card,
    ActionIcon,
    Alert,
} from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import { Trash } from 'tabler-icons-react';

export default function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [opened, setOpened] = useState(false);
    const [titleInputError, setTitleInputError] = useState(null);



    const taskTitle = useRef('');
    const taskSummary = useRef('');

    function createTask() {
        if (!taskTitle.current.value) return setTitleInputError("Title can't be empty");

        setTitleInputError("");
        setTasks([
            ...tasks,
            {
                title: taskTitle.current.value,
                summary: taskSummary.current.value,
            },
        ]);

        saveTasks([
            ...tasks,
            {
                title: taskTitle.current.value,
                summary: taskSummary.current.value,
            },
        ]);
        setOpened(false);
    }

    function deleteTask(index) {
        var clonedTasks = [...tasks];

        clonedTasks.splice(index, 1);

        setTasks(clonedTasks);

        saveTasks([...clonedTasks]);
    }

    function loadTasks() {
        let loadedTasks = localStorage.getItem('tasks');

        let tasks = JSON.parse(loadedTasks);

        if (tasks) {
            setTasks(tasks);
        }
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    function openModal() {
        setOpened(true);
        setTitleInputError(null);
    }

    useEffect(() => {
        loadTasks();
    }, []);


    return (
        <div>
            <Modal
                opened={opened}
                size={'md'}
                title={'New Task'}
                withCloseButton={false}
                onClose={() => {
                    setOpened(false);
                }}
                centered>
                {titleInputError && <Alert title="Ooops!" color="red">
                    {titleInputError}
                </Alert>}
                <TextInput
                    mt={'md'}
                    ref={taskTitle}
                    placeholder={'Task Title'}
                    required
                    label={'Title'}
                />
                <TextInput
                    ref={taskSummary}
                    mt={'md'}
                    placeholder={'Task Summary'}
                    label={'Summary'}
                />
                <Group mt={'md'} position={'apart'}>
                    <Button
                        onClick={() => {
                            setOpened(false);
                        }}
                        variant={'subtle'}>
                        Cancel
                    </Button>
                    <Button
                        onClick={createTask}>
                        Create Task
                    </Button>
                </Group>
            </Modal>
            <Group position={'apart'}>
                <Title
                    sx={theme => ({
                        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                        fontWeight: 900,
                    })}>
                    My Tasks App
                </Title>
            </Group>
            {tasks.length > 0 ? (
                tasks.map((task, index) => {
                    if (task.title) {
                        return (
                            <Card withBorder key={index} mt={'sm'} data-testid="task-card">
                                <Group position={'apart'}>
                                    <Text weight={'bold'}>{task.title}</Text>
                                    <ActionIcon
                                        onClick={() => {
                                            deleteTask(index);
                                        }}
                                        color={'red'}
                                        variant={'transparent'}>
                                        <Trash />
                                    </ActionIcon>
                                </Group>
                                <Text color={'dimmed'} size={'md'} mt={'sm'}>
                                    {task.summary
                                        ? task.summary
                                        : 'No summary was provided for this task'}
                                </Text>
                            </Card>
                        );
                    }
                })
            ) : (
                <Text size={'lg'} mt={'md'} color={'dimmed'}>
                    You have no tasks
                </Text>
            )}
            <Button
                onClick={openModal}
                fullWidth
                mt={'md'}>
                New Task
            </Button>
        </div>
    )
}
