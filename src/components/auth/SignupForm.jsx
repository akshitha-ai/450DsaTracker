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

function SignupForm() {
    const toast = useToast()
    const navigate = useNavigate() // Hook for programmatically navigating

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(
                'http://localhost:1247/api/auth/signup',
                data
            )
            localStorage.setItem('username', data.username) // Assuming the signup is successful and username is what you want to store
            toast({
                title: 'Signup successful.',
                description: 'Your account has been created successfully.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/') // Navigate to the homepage after successful signup
        } catch (error) {
            toast({
                title: 'Signup failed.',
                description:
                    error.response?.data?.message ||
                    'An error occurred during signup.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input id="username" name="username" type="text" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="email" name="email" type="email" />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input id="password" name="password" type="password" />
                </FormControl>
                <Button type="submit" colorScheme="blue">
                    Sign Up
                </Button>
            </VStack>
        </form>
    )
}

export default SignupForm
