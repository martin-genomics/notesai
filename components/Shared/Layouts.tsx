'use client'
import { AppShell, Avatar, Burger, Button, Collapse, Divider, Group, Menu, NavLink, rem, Stack, Text, TextInput, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, useEffect, useState } from "react";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { IconAlarm, IconArchive, IconChevronRight, IconDownload, IconLabel, IconLabelFilled, IconMoon, IconNote, IconPlus, IconSearch, IconSettings, IconSun, IconTrash } from "@tabler/icons-react";
// import { userStore } from "@/plugins/store";
import NewLabelModal from "../Modals/NewLabelModal";
import axios from "axios";
import { Label } from "@/types";

// const { getUser } = getKindeServerSession();





export function MainLayout({ children }: { children: ReactNode }) {


    const [opened, { toggle }] = useDisclosure()
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const [openedCollapsed, { toggle: toggleCollapsed }] = useDisclosure(false)
    const [openedNewLabelModal, { toggle: toggleNewLabelModal }] = useDisclosure(false)
    const [labels, setLabels] = useState<Label[]>([])


    const getLabels = async () => {
        try {
            const res = await axios.get("/api/notes/labels")

            setLabels(res.data?.data.labels)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getLabels();
    }, [openedCollapsed])

    return (
        <>
            <NewLabelModal
                open={toggleNewLabelModal}
                opened={openedNewLabelModal}
                close={() => toggleNewLabelModal()}

            />
            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: opened } }}
            >
                <AppShell.Header>
                    <Group h={"100%"} w={"100%"} px={"md"} justify="space-between" >
                        <Burger opened={!opened} onClick={toggle} hiddenFrom="md" size={"sm"} />

                        <Group w={{ md: 600 }}>
                            <Text>
                                Notesai

                            </Text>
                            <TextInput display={{ sm: "none", md: "block" }} w={{ sm: "100px", md: "400px", lg: "500px" }} placeholder="Search for notes" size="lg" leftSection={<IconSearch />} />


                        </Group>
                        <Group>

                            <Button color="dark" size="sm" onClick={() => toggleColorScheme()}>
                                {
                                    colorScheme === 'dark' ?
                                        <IconSun style={{ width: rem(14), height: rem(14) }} />
                                        :
                                        <IconMoon style={{ width: rem(14), height: rem(14) }} />
                                }
                            </Button>
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Avatar>

                                    </Avatar>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Label>
                                        Profile
                                    </Menu.Label>
                                    <Menu.Item leftSection={< IconSettings style={{ width: rem(14), height: rem(14) }} />} >
                                        Settings
                                    </Menu.Item>
                                    <Menu.Item leftSection={< IconNote style={{ width: rem(14), height: rem(14) }} />} >
                                        Archived Notes
                                    </Menu.Item>
                                    <Menu.Item leftSection={< IconSearch style={{ width: rem(14), height: rem(14) }} />} >
                                        Search
                                    </Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Label>
                                        Danger zone
                                    </Menu.Label>
                                    <Menu.Item leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}>
                                        Download my data
                                    </Menu.Item>
                                    <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}>
                                        Delete my account
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar>
                    <Stack py={30}>
                        <NavLink
                            href="/notes"
                            label="Notes"
                            leftSection={<IconNote size="1rem" stroke={1.5} />}
                            variant="subtle"
                            active
                        />

                        <NavLink
                            href="/reminders"
                            label="Reminders"
                            leftSection={<IconAlarm size="1rem" stroke={1.5} />}
                            variant="subtle"
                            active
                        />

                        <Button onClick={toggleCollapsed} rightSection={
                            <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                        } variant="subtle" fullWidth justify="flex-start" leftSection={<IconLabel />} size="lg">
                            <Text>Labels</Text>
                        </Button>
                        <AppShell.Section style={{ height: openedCollapsed ? 300 : 0, overflowY: 'scroll' }}>
                            <Collapse in={openedCollapsed} transitionDuration={500} transitionTimingFunction="linear" >
                                <Stack ml={10}>
                                    {labels.map((label: Label, index: number) => (
                                        <NavLink
                                            key={index}
                                            href={`/labels/${label?.id}/notes`}
                                            label={label?.name}
                                            leftSection={<IconLabelFilled size="1rem" stroke={1.5} />}
                                        />
                                    ))}
                                    <Button onClick={toggleNewLabelModal} variant="subtle" fullWidth justify="flex-start" leftSection={<IconPlus />} size="lg">
                                        <Text>New Label</Text>
                                    </Button>
                                </Stack>
                            </Collapse>
                            <Divider />

                        </AppShell.Section>
                        <NavLink
                            href="/archive"
                            label="Archive"
                            leftSection={<IconArchive size="1rem" stroke={1.5} />}
                            variant="subtle"
                            active
                        />

                        <NavLink
                            href="/trash"
                            label="Trash"
                            leftSection={<IconTrash size="1rem" stroke={1.5} />}
                            variant="subtle"
                            active
                        />
                    </Stack>
                </AppShell.Navbar>

                <AppShell.Main>
                    {children}
                </AppShell.Main>

            </AppShell>
        </>
    )
}