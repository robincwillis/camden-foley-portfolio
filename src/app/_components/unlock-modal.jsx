'use client'

import React, { useState, useContext } from 'react'
import { motion, cubicBezier, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

import AppContext from '@/app/_context/app-context'

import SubmitIcon from '@/app/_components/submit-icon'

const shakeAnimation = {
    initial: { x: 0 },
    animate: {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 },
    },
};


const UnlockModal = ({ onSubmit }) => {

    const { modalOpen, setModalOpen } = useContext(AppContext);

    const [password, setPassword] = useState('')
    const [passwordIncorrect, setPasswordIncorrect] = useState(false)
    const [passwordCorrect, setPasswordCorrect] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        setPasswordIncorrect(true);
        e.preventDefault();
        setLoading(true);
        const response = await fetch(`/api/projects`, {
            body: JSON.stringify({ password }),
            headers: { "Content-Type": "application/json" },
            method: "post",
        });

        if (response.status !== 200) {
            setPasswordIncorrect(true)
            setPasswordCorrect(false)
        } else {
            setPasswordIncorrect(false)
            setPasswordCorrect(true)
            setTimeout(() => {
                setModalOpen(false)
                window.location.reload()
            }, 500)
        }

    }

    const handleClose = () => {
        setPassword('')
        setPasswordIncorrect(false)
        setPasswordCorrect(false)
        setModalOpen(false)
    }

    return (
        <AnimatePresence initial={true} mode="popLayout">
            {modalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        ease: cubicBezier(.35, .17, .3, .86),
                        duration: 0.8,
                    }}
                    className="flex items-center justify-center z-30 fixed top-0 left-0 right-0 bottom-0 w-[full] h-[full] bg-white/50"
                >
                    <div
                        className="z-30 fixed top-0 left-0 right-0 bottom-0 w-[full] h-[full]"
                        onClick={handleClose}
                    />
                    <motion.div
                        className="relative z-40"
                        variants={shakeAnimation}
                        initial="initial"
                        animate={passwordIncorrect && "animate"}
                    >
                        <motion.div
                            className="bg-white p-5 border-[1px] border-black"
                            initial={{ y: -100 }}
                            animate={{ y: 1 }}
                            exit={{ y: 100 }}
                            transition={{
                                ease: cubicBezier(.35, .17, .3, .86),
                                duration: 0.8,
                            }}
                        >

                            <form
                                className="flex flex-row space-x-5"
                                onSubmit={handleSubmit}

                            >
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter Password"
                                    className="bg-gray-100 w-[300px] h-[60px] p-2.5 placeholder:text-gray-500 text-sm outline-none"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setPasswordIncorrect(false)
                                    }}
                                />
                                <button
                                    className={clsx("w-[60px] h-[60px] flex items-center justify-center transition-colors duration-75", {
                                        "text-white bg-black": password.length > 0,
                                        "pointer-events-none text-black bg-white border-[1px] border-black": password.length === 0
                                    })}
                                    type="submit"
                                >
                                    <SubmitIcon
                                        state={() => {
                                            if (passwordCorrect) {
                                                return 'check'
                                            } else if (passwordIncorrect) {
                                                return 'xmark'
                                            } else {
                                                return 'arrow'
                                            }
                                        }}
                                    />
                                </button>
                            </form >
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UnlockModal;