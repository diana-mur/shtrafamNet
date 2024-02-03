import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    token: localStorage.getItem('token'),
    roleid: localStorage.getItem('roleId'),
    id: localStorage.getItem('id'),
    error: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.error = undefined
            state.loading = false
            state.id = undefined
            state.roleid = undefined
            state.token = undefined

            localStorage.removeItem('token')
            localStorage.removeItem('roleId')
            localStorage.removeItem('id')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(authThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.token = payload.token
            state.roleid = payload.user.roleid
            state.id = payload.user.id

            console.log(payload.user);

            localStorage.setItem('token', payload.token)
            localStorage.setItem('roleId', payload.user.roleid)
            localStorage.setItem('id', payload.user.id)

            state.error = undefined
            state.loading = false
        })
        builder.addCase(authThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload.message
            state.loading = false
        })
    }
})

export const authThunk = createAsyncThunk('authThunk', async (data, { rejectWithValue }) => {
    const { phone, password } = data

    try {
        const result = await fetch('http://localhost:5000/auth', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const json = await result.json()
        if (result.status === 400) {
            return rejectWithValue(json)
        }
        return json
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})

export const { logOut } = authSlice.actions

export default authSlice.reducer