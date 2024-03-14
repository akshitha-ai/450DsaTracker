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
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignupForm() {
    const toast = useToast()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        try {
            await axios.post('http://localhost:1247/api/auth/signup', data)
            localStorage.setItem('username', data.username)
            toast({
                title: 'Signup successful.',
                description: 'Your account has been created successfully.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/')
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
        <Center h="100vh" backgroundImage="url('/background.jpg')" >
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
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input id="username" name="username" type="text" />
                        </FormControl>
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
                            Sign Up
                        </Button>
                        <Text mt={2}>
                            Already have an account?{' '}
                            <Link color="teal.500" to="/login">
                                Login
                            </Link>
                        </Text>
                    </VStack>
                </form>
            </Box>
        </Center>
    )
}

export default SignupForm
