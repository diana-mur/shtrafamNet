import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    message: undefined,
    token: localStorage.getItem('token'),
    roleid: localStorage.getItem('roleId'),
    id: localStorage.getItem('id'),
    error: undefined
}

export const regSlice = createSlice({
    name: 'reg',
    initialState,
    reducers: {
        reset: (state, action) => {
            state.message = undefined
            state.error = undefined
            state.loading = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(regThunk.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(regThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.token = payload.token
            state.roleid = payload.user.roleid
            state.id = payload.user.id

            localStorage.setItem('token', payload.token)
            localStorage.setItem('roleId', payload.user.roleid)
            localStorage.setItem('id', payload.user.id)

            state.error = undefined
            state.loading = false
        })
        builder.addCase(regThunk.rejected, (state, action) => {
            const payload = action.payload

            state.error = payload.message
            state.loading = false
        })
    }
})

export const regThunk = createAsyncThunk('regThunk', async (data, { rejectWithValue }) => {
    const { nick, phone, password } = data

    try {
        const result = await fetch('http://localhost:5000/reg', {
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
        return rejectWithValue(error)
    }
})

export const { reset } = regSlice.actions

export default regSlice.reducer