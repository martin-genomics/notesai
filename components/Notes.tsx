'use client'

import { Box, Button, ButtonGroup, Card, Collapse, Grid, Group, Notification, rem, Stack, Text, TextInput, Tooltip } from "@mantine/core"
import { IconImageInPicture, IconLabel, IconListCheck, IconPencilPlus } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import NoteCard from "./Shared/NoteCard"
import { Note } from "@/types"


export default function Notes() {
    const params = useParams()
    const [notes, setNotes] = useState([])
    const [openedCollapsed, { toggle: toggleCollapsed }] = useDisclosure(false)
    const [isLoading, { toggle: toggleIsLoading, close: stopLoading }] = useDisclosure(false);
    const [response, setResponse] = useState({ state: false, message: '', completed: false })
    const [value, setValue] = useState('');


    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            title: "",
            // content: ""
        },
        validate: {
            title: (value) => (value != '' && value.length > 2) ? null : "Title must be greater than 2 characters.",
            // content: (value) => (value != '' && value.length > 2) ? null : "Note content must be greater than 2 characters."
        }

    })


    const addNote = async (data: { title: string }) => {

        toggleIsLoading()
        try {
            const res = await axios.post('/api/notes', { ...data, content: value, labelId: params?.labelId })
            stopLoading()
            setResponse({ state: true, completed: true, message: res?.data?.message })
            setTimeout(() => {
                close();
            }, 400)


        } catch (error) {
            stopLoading()
            setResponse({ state: true, completed: false, message: "Could not add a label." })
            console.log(error)
        }
    }




    const getNotes = async () => {
        try {

            const res = await axios.get(`/api/notes`, { params: { ...params } })

            setNotes(res.data?.data.notes)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNotes();
    }, [response])


    return (
        <>
            <Box component="div">
                <Stack style={{ justifyItems: "center", alignItems: "center" }} my={{ md: 30 }}>
                    <Card shadow="sm" padding="xs" radius="md" withBorder w={{ sm: "100%", md: "40%" }} >
                        <Group py={"0px"} justify="space-between" >
                            <Text>
                                Take note ..
                            </Text>

                            <ButtonGroup flex={"row"} style={{ gap: 3 }} >
                                <Tooltip label="New list">
                                    <Button onClick={toggleCollapsed} variant="subtle" size="sm">
                                        <IconListCheck />
                                    </Button>
                                </Tooltip>

                                <Tooltip label="New with drawing">
                                    <Button onClick={toggleCollapsed} variant="subtle" size="sm">
                                        <IconPencilPlus />
                                    </Button>
                                </Tooltip>

                                <Tooltip label="New note with image">
                                    <Button onClick={toggleCollapsed} variant="subtle" size="sm">
                                        <IconImageInPicture />
                                    </Button>
                                </Tooltip>


                            </ButtonGroup>
                        </Group>

                        <Collapse in={openedCollapsed}>


                            <form className='flex flex-col gap-2' onSubmit={form.onSubmit((values) => addNote(values))}>

                                <TextInput
                                    withAsterisk
                                    placeholder="Title goes here"
                                    size="md"
                                    variant="unstyled"
                                    key={form.key("title")}
                                    {...form.getInputProps("title")}
                                />

                                {/* <TextInput
                                    withAsterisk
                                    label="Take Note"
                                    placeholder=""
                                    size="md"
                                    key={form.key("content")}
                                    {...form.getInputProps("content")}
                                /> */}

                                <Box>
                                    <ReactQuill key={form.key("content")} theme="snow" value={value} onChange={setValue} />
                                </Box>

                                <Group justify='flex-end' mt="md">
                                    <Button type='submit' variant="subtle" loading={isLoading}>
                                        Add Note
                                    </Button>
                                </Group>


                            </form>

                            {
                                response.state ?

                                    <Notification color={response.completed ? 'teal' : 'red'} >
                                        {response.message}
                                    </Notification>
                                    :
                                    null

                            }
                        </Collapse>
                    </Card>


                    {notes.length === 0 ?
                        <Stack style={{ justifyItems: "center", alignItems: "center" }}>
                            <IconLabel color="gray" style={{ height: rem(100), width: rem(100) }} />
                            <Text size="lg" >
                                No notes with this label yet
                            </Text>

                        </Stack>
                        :
                        <Grid w={{ md: "90%" }}>
                            {notes.map((value: Note, index: number) => (

                                <Grid.Col span={{ md: 2, lg: 3 }} key={index}>
                                    <NoteCard
                                        id={value?.id}
                                        title={value?.title}
                                        content={value?.content}
                                    />
                                </Grid.Col>
                            ))}
                        </Grid>
                    }




                </Stack>

            </Box>
        </>
    )
}