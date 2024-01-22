import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { RootState, useAppDispatch } from '../redux/store';

type UserType = {
  _id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};
type HomeType = {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  viewsCount: number;
  user: UserType;
};
export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData: HomeType[] | null | any = useSelector((state: RootState) => state.auth.data);
  const { posts, tags } = useSelector((state: RootState) => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map(
            (obj: HomeType[] | any, index: number) =>
              isPostsLoading ? (
                //@ts-ignore
                <Post key={index} isLoading />
              ) : (
                <Post
                  key={index}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable={userData?._id === obj?.user?._id}
                  children={null}
                  isFullPost={false}
                  isLoading={false}
                />
              ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />

          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
            children={null}
          />
        </Grid>
      </Grid>
    </>
  );
};
