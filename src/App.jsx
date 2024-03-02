import {
    Button,
    Flex,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaRobot } from 'react-icons/fa'
import MonacoEditor from 'react-monaco-editor'
import { Navigate, Route, Routes } from 'react-router-dom'

import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import DSA from './components/index'
import { Reacteroids } from './components/NotFound/Reacteroids'

function App({ fetchData }) {
    const [data, setData] = useState(fetchData)
    const isAuthenticated = localStorage.getItem('username')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editorLanguage, setEditorLanguage] = useState('javascript')

    useEffect(() => {
        localStorage.setItem('A2Z_Archive', JSON.stringify(data))
    }, [data])

    const logout = () => {
        localStorage.removeItem('username')
        window.location = '/login' // This forces a full reload to clear any app state
    }

    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
    }

    return (
        <>
            <Routes>
                {isAuthenticated ? (
                    <>
                        <Route
                            path="/"
                            element={
                                <DSA
                                    data={data}
                                    setData={setData}
                                    isHomeScreen={true}
                                    selectedContentIndex={0}
                                />
                            }
                        />
                        {data.data.content.map((contentData, index) => (
                            <Route
                                key={index}
                                path={contentData.contentPath}
                                element={
                                    <DSA
                                        data={data}
                                        setData={setData}
                                        isHomeScreen={false}
                                        selectedContentIndex={index}
                                    />
                                }
                            />
                        ))}
                        <Route
                            path="/play"
                            element={
                                <Flex w="100vw" h="100vh">
                                    <Reacteroids />
                                </Flex>
                            }
                        />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignupForm />} />
                        <Route
                            path="*"
                            element={<Navigate to="/login" replace />}
                        />
                    </>
                )}
            </Routes>
            {isAuthenticated && (
                <>
                    <IconButton
                        icon={<FaRobot />}
                        position="fixed"
                        bottom="20px"
                        right="20px"
                        colorScheme="teal"
                        borderRadius="full"
                        onClick={onOpen}
                        aria-label="Open code editor"
                    />
                    <Button
                        onClick={logout}
                        position="fixed"
                        top="20px"
                        right="20px"
                        colorScheme="red"
                    >
                        Logout
                    </Button>
                </>
            )}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Code Editor</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={0}>
                        <Select
                            value={editorLanguage}
                            onChange={e => setEditorLanguage(e.target.value)}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="c++">C++</option>
                            <option value="java">Java</option>
                        </Select>
                        <MonacoEditor
                            height="400"
                            language={editorLanguage}
                            theme="vs-dark"
                            options={editorOptions}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default App
