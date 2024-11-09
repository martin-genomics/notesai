'use client'

import { ActionIcon, Box, Button, ButtonGroup, Card, Group, Menu, rem, Spoiler, Text } from "@mantine/core"
import { IconArchive, IconCopy, IconDots, IconEdit, IconTrash, IconUserPlus } from "@tabler/icons-react";
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import EditNoteModal from "../Modals/EditNoteModal";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";


export default function NoteCard(
    {
        id,
        title,
        content
    }:
        {
            id: number,
            title: string;
            content: string
        }
) {



    const [isLoadingArchive, { toggle: toggleIsLoadingArchive, close: stopLoadingArchive }] = useDisclosure(false);

    const [openedEditNoteModal, { toggle: toggleEditNoteModal, close: closeEditNoteModal }] = useDisclosure(false);


    const archiveNote = async (data: { title: string }) => {



        toggleIsLoadingArchive()
        try {
            // const res = await axios.put(`/api/notes/${note?.id}`, { ...data, id: note.id, content: value })
            // stopLoadingArchive()
            // setResponse({ state: true, completed: true, message: res?.data?.message })
            // setTimeout(() => {
            //     close();
            // }, 400)


        } catch (error) {
            // stopLoading()
            // setResponse({ state: true, completed: false, message: "Could not update note." })
            // console.log(error)
        }
    }


    return (
        <>
            <EditNoteModal
                close={closeEditNoteModal}
                opened={openedEditNoteModal}
                open={toggleEditNoteModal}
                note={{ title, content, id }}
            />
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    {/* <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          /> */}
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs" style={{ alignItems: "center" }}>
                    <Spoiler maxHeight={30} maw={{ md: "80%" }} showLabel="..." hideLabel="Hide">
                        <Text size="lg" fw={900}>{title}</Text>
                    </Spoiler>
                    <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                            <ActionIcon variant="subtle" color="gray">
                                <IconDots style={{ width: rem(16), height: rem(16) }} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                                Delete Note
                            </Menu.Item>
                            <Menu.Item leftSection={<IconCopy style={{ width: rem(14), height: rem(14) }} />}>
                                Make a copy
                            </Menu.Item>
                            <Menu.Item
                                leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                            >
                                Version History
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
                <Box >
                    <Spoiler maxHeight={100} maw={{ md: "80%" }} showLabel="see more" hideLabel="Hide">
                        {
                            parse(DOMPurify.sanitize(content))
                        }
                    </Spoiler>

                </Box>



                <ButtonGroup>
                    <Button size="sm" onClick={toggleEditNoteModal} variant="subtle" mt="md" radius="md">
                        <IconEdit style={{ height: rem(20), width: rem(20) }} />
                    </Button>
                    <Button size="sm" onClick={toggleEditNoteModal} variant="subtle" mt="md" radius="md">
                        <IconUserPlus style={{ height: rem(20), width: rem(20) }} />
                    </Button>
                    <Button size="sm" onClick={toggleEditNoteModal} variant="subtle" mt="md" radius="md">
                        <IconArchive style={{ height: rem(20), width: rem(20)}} />
                    </Button>

                </ButtonGroup>
            </Card>
        </>
    )
}