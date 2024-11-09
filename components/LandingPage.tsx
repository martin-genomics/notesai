'use client'

import { Box, Button, Group, Stack, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import AuthModal from "./Auth/AuthModal";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";




export default function LandingPage() {

    const [opened, { open, close }] = useDisclosure(false);


    return (
        <>
            <AuthModal

                opened={opened}
                open={open}
                close={close}

            />
            <Box>
                <Stack className="mt-20" gap={30} align="center">
                    <p className="font-black text-5xl ">
                        Keep your notes in one place and in sync
                    </p>

                    <Text>
                        Unleash your creativity and ensure that every brilliant thought finds its place.
                        No more scattered thoughts. Turn your ideas into actionable plans with ease.
                    </Text>

                    <Group>
                        <Button component={RegisterLink} size="lg">
                            Try for free

                        </Button>
                        <Button variant="outline" size="lg">
                            Learn More
                        </Button>
                    </Group>
                </Stack>
            </Box>
        </>
    )
}