import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ticketSchema } from '../../utils/ticketSchema';
import {
  ALLOWED_TYPES_LABEL,
  MAX_FILE_SIZE_MB,
  MAX_FILES,
  formatFileSize,
} from '../../utils/attachmentRules';

const inputClass =
  'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm';

// Small helper so we don't repeat the red error text 4 times
function FieldError({ message }) {
  if (!message) { return null; }
  return (<p className="mt-1 text-xs text-red-600">{message}</p>);
}

function TicketsForm({ defaultValues, onSubmit, submitLabel, onCancel }) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ticketSchema),
    defaultValues,
  });

  const selectedFiles = Array.from(watch('attachments') || []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
          Subject
        </label>
        <input id="subject" type="text" {...register('subject')} className={inputClass} />
        <FieldError message={errors.subject?.message} />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700">
          Category
        </label>
        <select id="category" {...register('category')} className={inputClass}>
          <option value="">Select a category</option>
          <option value="Authentication">Authentication</option>
          <option value="Network">Network</option>
          <option value="Email">Email</option>
          <option value="Performance">Performance</option>
        </select>
        <FieldError message={errors.category?.message} />
      </div>

      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-slate-700">
          Priority
        </label>
        <select id="priority" {...register('priority')} className={inputClass}>
          <option value="">Select a priority</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
        <FieldError message={errors.priority?.message} />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea id="description" rows="4" {...register('description')} className={inputClass} />
        <FieldError message={errors.description?.message} />
      </div>

            <div>
        <label htmlFor="attachments" className="block text-sm font-medium text-slate-700">
          Attachments (optional)
        </label>

        <input
          id="attachments"
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf,.txt"
          {...register('attachments')}
          className="mt-1 block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
        />

        <p className="mt-1 text-xs text-slate-500">
          Up to {MAX_FILES} files, {MAX_FILE_SIZE_MB} MB each. Allowed: {ALLOWED_TYPES_LABEL}.
        </p>

        <FieldError message={errors.attachments?.message} />

        {selectedFiles.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {selectedFiles.map((file) => (
              <li key={file.name} className="flex justify-between rounded bg-slate-50 px-3 py-1">
                <span>{file.name}</span>
                <span className="text-slate-500">{formatFileSize(file.size)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
        >
          {submitLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TicketsForm;