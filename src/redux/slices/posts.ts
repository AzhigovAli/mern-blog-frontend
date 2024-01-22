import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  try {
    const { data } = await axios.get('/posts');
    return data;
  } catch (err) {
    throw err;
  }
});
export const fetchTags = createAsyncThunk<Tag[]>('posts/fetchTags', async () => {
  try {
    const { data } = await axios.get('/tags');
    return data;
  } catch (err) {
    throw err;
  }
});
export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id: string) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  } catch (err) {
    throw err;
  }
});

type Post = {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  user: {
    createdAt: string;
    email: string;
    fullName: string;
    passwordHash: string;
    updatedAt: string;
    _id: string;
  };
  viewCount: number;
};
type Tag = string[];
interface InitialStateType {
  posts: {
    items: Post[];
    status: string;
  };
  tags: {
    items: Tag[];
    status: string;
  };
}
const initialState: InitialStateType = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts.items = action.payload;
        state.posts.status = 'loaded';
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = 'error';
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action: PayloadAction<Tag[]>) => {
        state.tags.items = action.payload;
        state.tags.status = 'loaded';
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = 'error';
      })
      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
      });
  },
});

export const postsReducer = postsSlice.reducer;
