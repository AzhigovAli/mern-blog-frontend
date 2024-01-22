import React from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { AxiosResponse, AxiosError } from 'axios';

type UserType = {
  _id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};

type FullPostType = {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  imageUrl?: string;
  updatedAt: string;
  createdAt: string;
  viewsCount: string;
  user: UserType;
};

export const FullPost: React.FC = () => {
  const [data, setData] = React.useState<FullPostType | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get<FullPostType[]>(`/posts/${id}`)
      .then((res: any) => {
        //AxiosResponse<FullPostType[]>
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err: any) => {
        const error = err as Error | AxiosError;
        console.log(error);
        alert('Ошибка при получении статьи');
      });
  }, []);

  if (isLoading) {
    //@ts-ignore
    return <Post isLoading={isLoading} isFullPost />;
  }

  if (!data) {
    return <div>Данные не найдены</div>;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data?.imageUrl ? `http://localhost:4444${data?.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
        isLoading={false}
        isEditable={null}>
        <ReactMarkdown children={data.text} />
      </Post>

      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
