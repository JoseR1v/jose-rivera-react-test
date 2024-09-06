import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  password: string;
}

const initialState: UserState = {
  name: 'José Manuel',
  email: 'correo@dominio.com',
  password: 'Password123@',
};

const loadUserFromLocalStorage = (): UserState => {
  const storedUser = localStorage.getItem('userData');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error('Error al cargar los datos del usuario');
    }
  }
  return initialState;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: loadUserFromLocalStorage(),
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { name, email, password } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      localStorage.setItem('userData', JSON.stringify(state)); 
    },
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      const { name, email, password } = action.payload;
      if (name) state.name = name;
      if (email) state.email = email;
      if (password) state.password = password;
      localStorage.setItem('userData', JSON.stringify(state)); 
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
