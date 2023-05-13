import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/user'

export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
};

const fileUploadStyle = {
    '&::file-selector-button': fileUploadCss,
};
function Register() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [imagePrev, setImagePrev] = useState()
    const [image, setImage] = useState()

    const dispatch = useDispatch();

    const changeImageHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImagePrev(reader.result)
            setImage(file)
        }
    }
    const submitHandler = e => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append('name', name);
        myForm.append('email', email);
        myForm.append('password', password);
        myForm.append('file', image);

        dispatch(register(myForm));
    };
    return (
        <Container>
            <VStack h={'full'} justifyContent={'center'}>
                <Heading my={'10'} textTransform={'uppercase'} children="Registration" />
                <form onSubmit={submitHandler} style={{ width: '100%' }}>
                    <Box display='flex' justifyContent={'center'}>
                        <Avatar size={'2xl'} src={imagePrev} />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='name' children='Name' />
                        <Input required id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" type={"text"} focusBorderColor="yellow.500" />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='email' children='Email Address' />
                        <Input required id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abc@gmail.com" type={"email"} focusBorderColor="yellow.500" />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='password' children='Password' />
                        <Input required id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" type={"password"} focusBorderColor="yellow.500" />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='chooseAvatar' children='Choose Avatar' />
                        <Input accept='image/*' required id="chooseAvater" type={"file"} focusBorderColor="yellow.500" css={fileUploadStyle} onChange={changeImageHandler} />
                    </Box>
                    <Button my={4} colorScheme={'yellow'} type="submit">Sign Up</Button>
                    <Box my={4}>
                        Already Signed Up?
                        {' '}
                        <Link to="/login">
                            <Button colorScheme={'yellow'} variant={'link'}> Login </Button>
                        </Link>
                        {' '}
                        here
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Register