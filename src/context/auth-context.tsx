import React, { ReactNode, useState } from 'react';
import * as auth from 'auth-provider'
import { User } from '../screens/project-list/search-pannel';
import { http } from '../utils/http';
import { useMount } from '../utils/index';

interface AuthForm {
  username: string,
  password: string
}

const bootstrapUser = async () => { // 作用是为了让页面刷新时不丢失登录态
  // 从 localStorage 中获取 token，如果可以获取到，那么再通过 token 获取 user 信息
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', {token})
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<{
  user: User | null,
  register: (form: AuthForm) => Promise<void>
  login: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext' // 在 react 工具中监控的名字

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => auth.login(form).then(user => setUser(user))
  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user))
  const logout = () => auth.logout().then(() => setUser(null))

  useMount(() => {
    bootstrapUser().then(setUser)
  })

  return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  // console.log('context===',context);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}