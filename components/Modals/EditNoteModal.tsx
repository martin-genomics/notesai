'use client'
import { Modal, Button, Notification, TextInput, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios'
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';

type EditNoteModalProps = {
    opened: boolean;
    close: () => void;
    open: () => void;
    note: { id: number, title: string, content: string }
}


export default function EditNoteModal({
    opened,
    close,
    note,
}: EditNoteModalProps) {

    const [isLoading, { toggle: toggleIsLoading, close: stopLoading }] = useDisclosure(false);
    // const [response, setResponse] = useState({ state: false, message: '', completed: false })
    const [response, setResponse] = useState({ state: false, message: '', completed: false })



    const [value, setValue] = useState(note?.content);

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

    useEffect(() => {
    }, [value])


    const updateNote = async (data: { title: string }) => {



        toggleIsLoading()
        try {
            const res = await axios.put(`/api/notes/${note?.id}`, { ...data, id: note.id, content: value })
            stopLoading()
            setResponse({ state: true, completed: true, message: res?.data?.message })
            setTimeout(() => {
                close();
            }, 400)


        } catch (error) {
            stopLoading()
            setResponse({ state: true, completed: false, message: "Could not update note." })
            console.log(error)
        }
    }




    return (
        <>
            <Modal opened={opened} onClose={close} title="Edit Note" centered>
                {/* Modal content */}


                <form className='flex flex-col gap-2' onSubmit={form.onSubmit((values) => updateNote(values))}>

                    <TextInput
                        withAsterisk
                        placeholder="Title goes here"
                        size="md"
                        variant="unstyled"
                        key={form.key("title")}
                        {...form.getInputProps("title")}
                        defaultValue={note?.title}
                    />

                    <Box>
                        <ReactQuill key={form.key("content")} theme="snow" value={value} onChange={setValue} />
                    </Box>

                    <Group justify='flex-end' mt="md">
                        <Button type='submit' variant="subtle" loading={isLoading}>
                            Update
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
            </Modal>

        </>
    );
}