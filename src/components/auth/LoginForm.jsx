/* eslint-disable react/no-unescaped-entities */
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

function LoginForm() {
    const navigate = useNavigate()
    const toast = useToast()
    const [loginSuccess, setLoginSuccess] = useState(false)
    const handleChange = () => {
        navigate('/')
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        console.log('dataaaaaaa', data.email)

        try {
            await axios.post('http://localhost:1247/api/auth/login', data)
            localStorage.setItem('username', data.email)
            toast({
                title: 'Login successful.',
                description: "You've logged in successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setLoginSuccess(true)
        } catch (error) {
            toast({
                title: 'Login failed.',
                description:
                    error.response?.data?.message ||
                    'An error occurred during login.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    if (loginSuccess) {
        return (
            <Center h="100vh">
                <Box
                    border="1px"
                    borderColor="gray.200"
                    p={6}
                    borderRadius="md"
                    w="md"
                >
                    <VStack spacing={4}>
                        <Text>Login successful! Click below to proceed.</Text>
                        <Button
                            as={RouterLink}
                            to="/"
                            colorScheme="blue"
                            width="full"
                            onClick={handleChange}
                        >
                            Go to Homepage
                        </Button>
                    </VStack>
                </Box>
            </Center>
        )
    }

    return (
        <Center h="100vh" backgroundImage="url('/background.jpg')">
            <Box
                border="1px"
                borderColor="gray.200"
                p={6}
                borderRadius="md"
                w="md"
                backgroundColor="white"
                backgroundSize="cover"
                backgroundPosition="center"
            >
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input id="email" name="email" type="email" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" width="full">
                            Login
                        </Button>
                        <Text mt={2}>
                            Don't have an account?{' '}
                            <RouterLink
                                to="/signup"
                                style={{ color: '#319795' }}
                            >
                                Register
                            </RouterLink>
                        </Text>
                    </VStack>
                </form>
            </Box>
        </Center>
    )
}

export default LoginForm
