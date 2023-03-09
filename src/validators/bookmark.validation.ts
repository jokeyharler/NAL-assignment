import * as yup from 'yup';

export const bookmarkCreateSchema = yup.object({
  body: yup.object({
    url: yup.string().url().required(),
  }),
});

export const bookmarkGetSchema = yup.object({
  query: yup.object({
    page: yup.number(),
    limit: yup.number(),
  }),
});

export const bookmarkGetByIdSchema = yup.object({
  params: yup.object({
    id: yup.string().uuid().required(),
  }),
});

export const bookmarkUpdateSchema = yup.object({
  body: yup.object({
    id: yup.string().uuid().required(),
    title: yup.string(),
    image: yup.string().url(),
    description: yup.string(),
  }),
});
