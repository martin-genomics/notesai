'use client'
import { Modal, Button, Notification, TextInput, Group } from '@mantine/core';
import { useForm } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios'
import { useState } from 'react';

type NewLabelModalProps = {
  opened: boolean;
  close: () => void;
  open: () => void;
}


export default function NewLabelModal({
  opened,
  close,
}: NewLabelModalProps) {

  const [isLoading, { toggle: toggleIsLoading, close: stopLoading }] = useDisclosure(false);
  const [response, setResponse] = useState({ state: false, message: '', completed: false })

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      label: "",
    },
    validate: {
      label: (value) => (value != '' && value.length > 2) ? null : "Label must be greater than 2 characters."
    }
  })

  const addLabel = async (data: { label: string }) => {

    toggleIsLoading()
    try {
      const res = await axios.post('/api/notes/labels', data)
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




  return (
    <>
      <Modal opened={opened} onClose={close} title="New Label" centered>
        {/* Modal content */}


        <form className='flex flex-col gap-2' onSubmit={form.onSubmit((values) => addLabel(values))}>

          <TextInput
            withAsterisk
            label="Label name"
            placeholder=""
            size="md"
            key={form.key("label")}
            {...form.getInputProps("label")}
          />

          <Group justify='flex-end' mt="md">
            <Button type='submit' variant="subtle" loading={isLoading}>
              Add Label
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