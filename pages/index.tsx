import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, yupResolver } from '@mantine/form'
import { AuthForm } from '../types'
import * as Yup from 'yup'
import axios from 'axios'
import { IconDatabase } from '@tabler/icons'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { Layout } from '../components/Layout'
import {
  Anchor,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert,
} from '@mantine/core'
import { Header } from '../components/Header'

// const schema = Yup.object().shape({
//   name: Yup.string().required('No Name provided'),
//   email: Yup.string().email('Invalid email').required('No email provided'),
//   password: Yup.string()
//     .required('No password provided')
//     .min(5, 'Password should be min 5 chars'),
// })

const Home: NextPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const router = useRouter()
  const [error, setError] = useState('')

  const registerSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password should be at least 5 characters'),
  })

  const loginSchema = Yup.object({
    identifier: Yup.string().required('Username or email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password should be at least 5 characters'),
  })

  const form = useForm({
    validate: yupResolver(isRegister ? registerSchema : loginSchema),
    initialValues: isRegister
      ? { name: '', email: '', password: '' }
      : { identifier: '', password: '' },
  })
  const handleSubmit = async () => {
    try {
      const { name, email, password } = form.values
      const identifier = form.values.identifier || ''

      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          name: name,
          email: email,
          password: password,
        })
      } else {
        const loginData = identifier.includes('@')
          ? { email: identifier, password }
          : { name: identifier, password }
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          loginData,
        )
      }

      form.reset()
      router.push('/dashboard')
    } catch (e: any) {
      const errorMessage =
        e.response?.data?.message || 'An unexpected error occurred.'
      setError(errorMessage)
    }
  }
  return (
    <>
      <Header />
      <Layout title="Auth">
        <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
        {error && (
          <Alert
            my="md"
            variant="filled"
            icon={<ExclamationCircleIcon />}
            title="Authorization Error"
            color="red"
            radius="md"
          >
            {error}
          </Alert>
        )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {isRegister && (
            <>
              <TextInput
                mt="md"
                id="name"
                label="Name*"
                placeholder="UserName"
                {...form.getInputProps('name')}
              />
              <TextInput
                mt="md"
                id="email"
                label="Email*"
                placeholder="example@gmail.com"
                {...form.getInputProps('email')}
              />
            </>
          )}
          {!isRegister && (
            <TextInput
              mt="md"
              id="identifier"
              label="Username or Email*"
              placeholder="Username or example@gmail.com"
              {...form.getInputProps('identifier')}
            />
          )}
          <PasswordInput
            mt="md"
            id="password"
            placeholder="password"
            label="Password*"
            description="Must be min 5 char"
            {...form.getInputProps('password')}
          />
          <Group>
            <Anchor
              component="button"
              type="button"
              size="xs"
              className="text-gray-300"
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
            >
              {isRegister
                ? 'Have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              leftIcon={<IconDatabase size={14} />}
              color="cyan"
              type="submit"
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Group>
        </form>
      </Layout>
    </>
  )
}

export default Home
