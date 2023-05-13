import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const { loading, message, error } = useSelector(state => state.profile);

    const dispatch = useDispatch();
    const submitHandler = e => {
        e.preventDefault();
        dispatch(forgetPassword(email));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message]);

    return (
        <Container py={'16'} h="90vh">
            <form onSubmit={submitHandler}>
                <Heading
                    children="Forget Password"
                    my="16"
                    textTransform={'uppercase'}
                    textAlign={['center', 'left']}
                />

                <VStack spacing={'8'}>
                    <Input
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="abc@gmail.com"
                        type={'email'}
                        focusBorderColor="yellow.500"
                    />

                    <Button
                        isLoading={loading}
                        type="submit"
                        w={'full'}
                        colorScheme="yellow"
                    >
                        Send Reset Link
                    </Button>
                </VStack>
            </form>
        </Container>
    );
};

export default ForgetPassword;
