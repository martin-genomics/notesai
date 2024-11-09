'use client'

import { Box, Button, Divider, Grid, Group, HoverCard, List, ListItem, Text, useMantineColorScheme } from "@mantine/core"
import { IconSun, IconMoon } from '@tabler/icons-react';



export default function Header() {

    const { colorScheme,toggleColorScheme } = useMantineColorScheme()

    

    return (
        <div className="flex justify-between py-5 items-center w-[40%]">
            <div>
                <p className="font-bold text-xl">
                    NOTESAI
                </p>
            </div>

            <Box w={{ sm: "100%", md: "300px", lg: "500px"}}>
                <Group>
                    <Text>
                        Home
                    </Text>

                    <HoverCard>
                        <HoverCard.Target>
                            <Button variant='transparent'>
                                Product
                            </Button>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Grid
                                columns={2}
                                
                                className="w-96 h-96"
                            >
                                <List>
                                    <ListItem>
                                        Notes
                                    </ListItem>
                                </List>
                                <Divider />
                                <List >
                                    <ListItem>
                                        Notes
                                    </ListItem>
                                </List>

                                <Divider variant="solid" size={10}/>
                                
                                <List >
                                    <ListItem>
                                        Notes
                                    </ListItem>
                                </List>
                            </Grid>
                        </HoverCard.Dropdown>
                    </HoverCard>


                    <HoverCard>
                        <HoverCard.Target>
                            <Button variant="transparent">
                                About
                            </Button>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Grid
                                columns={2}
                                
                                className="w-96 h-96"
                                
                            >
                                <List>
                                    <ListItem>
                                        Notes
                                    </ListItem>
                                </List>
                                <Divider />
                                <List >
                                    <ListItem>
                                        Notes
                                    </ListItem>
                                </List>

                                <Divider variant="solid" size={10}/>
                                
                                <List >
                                    <ListItem>
                                        Notes
                                    </ListItem>
                                </List>
                            </Grid>
                        </HoverCard.Dropdown>
                    </HoverCard>



                    <HoverCard>
                        <HoverCard.Target>
                            <Button variant="transparent">
                                Contact
                            </Button>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Grid
                                columns={2}
                                
                                className="w-96 h-96"
                            >
                                <List>
                                    <ListItem>
                                        Notes
                                    </ListItem>
                                </List>
                                <Divider />
                                <List >
                                    <ListItem>
                                        Notes
                                    </ListItem>
                                </List>

                                <Divider variant="solid" size={10}/>
                                
                                <List >
                                    <ListItem>
                                        Notes
                                    </ListItem>
                                </List>
                            </Grid>
                        </HoverCard.Dropdown>
                    </HoverCard>

                    <Button onClick={() => toggleColorScheme()}>
                        {
                            colorScheme === 'dark'?
                            <IconSun/>
                            :
                            <IconMoon />
                        }
                    </Button>
                </Group>
            </Box>
        </div>
    )
}