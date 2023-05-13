import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { ColorModeSwitcher } from '../../../ColorModeSwitcher'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';


const LinkButton = ({ url = "/", title = "Home", onClose }) => {
    return (
        <Link to={url} onClick={onClose}>
            <Button variant={'ghost'}>{title}</Button>
        </Link>
    )
}

const Header = ({ isAuthenticated = false, user }) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const dispatch = useDispatch();

    const logoutHandler = () => {
        onClose();
        dispatch(logout());
    };
    return (
        <>
            <ColorModeSwitcher />
            <Button onClick={onOpen} colorScheme={'yellow'} width="12" height={'12'} rounded="full" position={'fixed'} top="6" left="6" zIndex={'overlay'}><RiMenu5Fill /></Button>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'}>E-LEARNING</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={"4"} alignItems="flex-start">
                            <LinkButton url='/' title='Home' onClose={onClose} />
                            <LinkButton url='/recommend' title='Recommended Courses' onClose={onClose} />
                            <LinkButton url='/courses' title='Browse All Courses' onClose={onClose} />
                            <LinkButton url='/request' title='Request a Course' onClose={onClose} />
                            <LinkButton url='/contact' title='Contact Us' onClose={onClose} />
                            <LinkButton url='/about' title='About' onClose={onClose} />
                            <HStack justifyContent={'space-evenly'} position='absolute' bottom={"2rem"} width='80%'>
                                {isAuthenticated ? (
                                    <>
                                        <VStack>
                                            <HStack>
                                                <Link to="/profile" onClick={onClose}>
                                                    <Button variant={'ghost'} colorScheme={'yellow'}>Profile</Button>
                                                </Link>
                                                <Button onClick={logoutHandler} variant={'ghost'}>
                                                    <RiLogoutBoxLine />
                                                    Logout</Button>
                                            </HStack>
                                            {user && user.role === "admin" && (
                                                <Link to="/admin/dashboard" onClick={onClose}>
                                                    <Button colorScheme={'purple'} variant={"ghost"}>
                                                        <RiDashboardFill style={{ margin: '4px' }} />
                                                        Dashboard
                                                    </Button>
                                                </Link>
                                            )}
                                        </VStack>
                                    </>) : (
                                    <>
                                        <Link to="/login" onClick={onClose}>
                                            <Button colorScheme={'yellow'}>Login</Button>
                                        </Link>
                                        <p>OR</p>
                                        <Link to="/register" onClick={onClose}>
                                            <Button colorScheme={'yellow'}>Sign Up</Button>
                                        </Link>
                                    </>
                                )}
                            </HStack>

                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header
