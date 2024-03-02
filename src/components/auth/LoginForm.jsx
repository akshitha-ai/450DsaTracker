/* eslint-disable no-unused-vars */
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const toast = useToast()
    const navigate = useNavigate() // Hook for navigation

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        try {
            const response = await axios.post(
                'http://localhost:1247/api/auth/login',
                data
            )
            localStorage.setItem('username', data.username) // Storing username for authentication check
            toast({
                title: 'Login successful.',
                description: "You've logged in successfully.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/') // Navigate to the homepage after successful login
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
            // Optionally clear the input fields on failure
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" name="email" type="email" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input id="password" name="password" type="password" />
                </FormControl>
                <Button type="submit" colorScheme="blue">
                    Login
                </Button>
            </VStack>
        </form>
    )
}

export default LoginForm
