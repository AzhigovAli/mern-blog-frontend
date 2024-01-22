import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
//@ts-ignore
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Navigation } from '@mui/icons-material';
//@ts-ignore
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';

type UserType = {
  _id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};
type AddPostType = {
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
export const AddPost = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [text, setText] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [tags, setTags] = React.useState<string>('');
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const isEditing = Boolean(id);
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeFile = async (event: any) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };
  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title,
        tags,
        imageUrl,
        text,
      };
      const { data } = await (isEditing
        ? axios.patch(`/posts/${id}`, fields)
        : axios.post('/posts', fields));
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при создании статьи!');
    }
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        uniqueId: 'uniqueId',
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  React.useEffect(() => {
    if (id) {
      axios
        .get<AddPostType[]>(`/posts/${id}`)
        .then(({ data }: any) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
        })
        .catch((err: Error | AxiosError) => {
          console.warn(err);
          alert('Ошибка при получении статьи!');
        });
    }
  }, []);
  if (window.localStorage.getItem('token') && !isAuth) {
    return <Navigation to="/" />;
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef?.current?.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
