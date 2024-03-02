import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthenticationForm() {
    const [isLoginMode, setIsLoginMode] = useState(true)
    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        try {
            const endpoint = isLoginMode ? 'login' : 'signup'
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(
                `http://localhost:1247/api/auth/${endpoint}`,
                data
            )
            localStorage.setItem('username', data.username) // Adjust based on your API response
            toast({
                title: isLoginMode ? 'Login Successful' : 'Signup Successful',
                description: isLoginMode
                    ? "You're now logged in."
                    : 'Your account has been created.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            navigate('/')
        } catch (error) {
            toast({
                title: 'Error',
                description:
                    error.response?.data?.message ||
                    'Something went wrong. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    return (
        <Box p={5}>
            <Text fontSize="xl" mb={2}>
                {isLoginMode ? 'Login' : 'Signup'}
            </Text>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    {!isLoginMode && (
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input name="username" />
                        </FormControl>
                    )}
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input name="email" type="email" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input name="password" type="password" />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full">
                        {isLoginMode ? 'Login' : 'Signup'}
                    </Button>
                </VStack>
                <Switch
                    mt={4}
                    isChecked={!isLoginMode}
                    onChange={() => setIsLoginMode(!isLoginMode)}
                />
                <Text
                    mt={2}
                    cursor="pointer"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                >
                    {isLoginMode
                        ? 'Need an account? Signup'
                        : 'Already have an account? Login'}
                </Text>
            </form>
        </Box>
    )
}

export default AuthenticationForm
