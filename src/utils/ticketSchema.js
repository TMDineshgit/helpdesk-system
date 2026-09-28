import * as yup from 'yup';
import { ALLOWED_FILE_TYPES, ALLOWED_TYPES_LABEL, MAX_FILE_SIZE_MB, MAX_FILES } from './attachmentRules';

export const ticketSchema = yup.object({
  subject: yup
    .string()
    .trim()
    .required('Subject is required')
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be at most 100 characters'),

  description: yup
    .string()
    .trim()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),

  category: yup
    .string()
    .oneOf(['Authentication', 'Network', 'Email', 'Performance'], 'Please choose a valid category')
    .required('Category is required'),

  priority: yup
    .string()
    .oneOf(['HIGH', 'MEDIUM', 'LOW'], 'Please choose a valid priority')
    .required('Priority is required'),
  
  attachments: yup
    .mixed()
    .test(
      'maxFiles',
      `You can attach at most ${MAX_FILES} files`,
      (files) => !files || files.length <= MAX_FILES
    )
    .test(
      'fileType',
      `Only ${ALLOWED_TYPES_LABEL} files are allowed`,
      (files) => !files || Array.from(files).every((f) => ALLOWED_FILE_TYPES.includes(f.type))
    )
    .test(
      'fileSize',
      `Each file must be ${MAX_FILE_SIZE_MB} MB or smaller`,
      (files) =>
        !files || Array.from(files).every((f) => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024)
    ),
  
});